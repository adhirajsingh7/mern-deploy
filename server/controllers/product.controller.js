const { Product } = require("../models/product");
const {
  delete_on_cloudinary,
  upload_on_cloudinary,
} = require("../utils/cloudinary");

exports.get_products = async (req, res, next) => {
  let {
    page = 0,
    limit = 10,
    name = "",
    category = "",
    sortBy = "",
  } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;

  let offset = page * limit;
  let criteria = {};
  if (name) criteria.name = { $regex: name, $options: "i" };
  if (category) criteria.category = { $in: category.split(",") };

  // sorting logic
  if (sortBy) {
    if (sortBy === "price_low") sortBy = { price: 1 };
    if (sortBy === "price_high") sortBy = { price: -1 };
    if (sortBy === "relevance") sortBy = { created_at: 1 };
    if (sortBy === "newest") sortBy = { created_at: -1 };
  } else {
    sortBy = { created_at: 1 };
  }

  try {
    const response = await Product.find(criteria, {}, { sort: sortBy })
      .limit(limit * 1)
      .skip(offset)
      .exec();
    const count = await Product.find(criteria).countDocuments();

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

exports.get_product_by_id = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const response = await Product.findOne({ _id: product_id });
    if (!response) throw new Error("Product not found.");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_product = async (req, res, next) => {
  const {
    name = "",
    description = "",
    price = 0,
    stock = 0,
    category = "",
  } = req.body;

  let image_local_path;
  if (
    req.files &&
    Array.isArray(req.files.image) &&
    req.files.image.length > 0
  ) {
    image_local_path = req.files.image[0].path;
  }

  try {
    const image = await upload_on_cloudinary(image_local_path);

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image: image?.url || "",
    });
    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_product = async (req, res, next) => {
  const { product_id } = req.params;
  let updated_product = req.body;

  let image_local_path;
  if (
    req.files &&
    Array.isArray(req.files.image) &&
    req.files.image.length > 0
  ) {
    image_local_path = req.files.image[0].path;
  }

  try {
    const image = await upload_on_cloudinary(image_local_path);
    if (image) {
      updated_product.image = image.url;
    } else {
      delete updated_product["image"];
    }

    const response = await Product.findOneAndUpdate(
      { _id: product_id },
      updated_product
    );
    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_product = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // delete image on cloudinary
    const { image } = product;
    const image_public_id = image.split("/").pop().split(".")[0];
    await delete_on_cloudinary(image_public_id);

    const response = await Product.findOneAndDelete({ _id: product_id });
    return res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
