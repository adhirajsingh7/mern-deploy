const { Cart } = require("../models/cart");
const { User } = require("../models/user");
const {
  upload_on_cloudinary,
  delete_on_cloudinary,
} = require("../utils/cloudinary");
const bcrypt = require("bcrypt");

exports.get_users = async (req, res, next) => {
  let { page = 0, limit = 10, name = "", status = "", role = "" } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;

  let offset = page * limit;
  let criteria = {};
  if (name) criteria.full_name = { $regex: name, $options: "i" };
  if (status) criteria.status = { $eq: status };
  if (role) criteria.role = { $eq: role };

  try {
    const response = await User.find(criteria, {}, { skip: offset, limit });
    const count = await User.find(criteria).countDocuments();

    res.status(200).send({
      total: count,
      total_page: Math.ceil(count / limit),
      current_page: page,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_user_by_id = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const response = await User.findOne({ _id: user_id });
    if (!response) throw new Error("User not found.");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_user = async (req, res, next) => {
  const user = req.body;
  try {
    const response = await User.create(user);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_user = async (req, res, next) => {
  const { user_id } = req.params;
  const updated_user = req.body;
  const { previous_password, new_password, email } = req.body;

  // console.log(req.body);
  // console.log(req.files);
  // return res.status(200).send("asdasd");
  try {
    if (new_password) {
      const user = await User.findOne({ _id: user_id });
      const is_password_valid = await user.is_password_correct(
        previous_password
      );
      if (!is_password_valid) {
        // throw new Error("Password is wrong");
        return res.status(400).json({ message: "Password is wrong" });
      }

      updated_user.password = await bcrypt.hash(new_password, 10);
    }

    if (email) {
      const userExistsWithEmail = await User.findOne({ email: email });
      if (userExistsWithEmail && userExistsWithEmail._id.toString() !== user_id)
        return res.status(409).json({ message: "Email alread in use" });
    }

    // upload image
    let avatar_local_path;
    if (
      req.files &&
      Array.isArray(req.files.avatar) &&
      req.files.avatar.length > 0
    ) {
      avatar_local_path = req.files.avatar[0].path;
    }

    const avatar = await upload_on_cloudinary(avatar_local_path);
    if (avatar) {
      updated_user.avatar = avatar.url;
    } else {
      delete updated_user["avatar"];
    }

    const response = await User.findOneAndUpdate(
      { _id: user_id },
      updated_user
    );
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_user = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // delete avatar on cloudinary
    const { avatar } = user;
    const avatar_public_id = avatar.split("/").pop().split(".")[0];
    const avatar_deleted = await delete_on_cloudinary(avatar_public_id);

    const response = await User.findOneAndDelete({ _id: user_id });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// signup user
exports.signup_user = async (req, res, next) => {
  const {
    username = "",
    email = "",
    password = "",
    full_name = "",
    mobile = 0,
    role = "user",
  } = req.body;
  console.log(req.body);
  console.log(req.files);
  // console.log(req.files.avatar[0]);
  // return res.status(200).send("hey");
  const user_exists = await User.findOne({ email });
  if (user_exists)
    return res.status(409).json({ message: "User already exists" });

  // upload image
  let avatar_local_path;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatar_local_path = req.files.avatar[0].path;
  }

  const avatar = await upload_on_cloudinary(avatar_local_path);

  const user = await User.create({
    username,
    email,
    password,
    full_name,
    mobile,
    role,
    avatar: avatar?.url || "",
  });

  const user_cart = await Cart.create({ user_id: user._id });

  return res.status(201).json(user);
};

exports.login_user = async (req, res, next) => {
  const { email = "", password = "" } = req.body;

  try {
    const user_exists = await User.findOne({ email });
    if (!user_exists)
      return res.status(404).json({ message: "User does not exists" });

    const is_password_valid = await user_exists.is_password_correct(password);
    if (!is_password_valid)
      return res.status(401).json({ message: "Password is incorrect" });

    return res
      .status(200)
      .json({ user: user_exists, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
