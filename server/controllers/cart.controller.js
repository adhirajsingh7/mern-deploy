const { Cart } = require("../models/cart");

exports.get_all_carts = async (req, res, next) => {
  // const { user_id } = req.query;
  try {
    let criteria = {};
    // if (user_id) criteria.user_id = user_id;
    criteria.user_id = req.user._id;

    const response = await Cart.find(criteria).populate("products.product");
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.add_product = async (req, res, next) => {
  const user_id = req.user._id;
  const product = req.body;
  try {
    const cart = await Cart.findOne({ user_id: user_id });
    cart.products.push(product);
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.edit_cart = async (req, res, next) => {
  const { cart_id } = req.params;
  const updated_product = req.body;
  try {
    const cart = await Cart.findOne({ _id: cart_id });
    const index = cart.products.findIndex(
      (product_obj) =>
        product_obj.product.toString() === updated_product.product.toString()
    );
    if (index !== -1) {
      cart.products[index] = updated_product;
      if (cart.products[index].quantity === 0) {
        cart.products.splice(index, 1);
      }
    }
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.empty_cart = async (req, res, next) => {
  const { cart_id } = req.params;
  try {
    const cart = await Cart.findOne({ _id: cart_id });
    cart.products = [];
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
