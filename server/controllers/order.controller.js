const { Cart } = require("../models/cart");
const { Order } = require("../models/order");
const { Product } = require("../models/product");

exports.get_orders = async (req, res, next) => {
  let { page = 0, limit = 10 } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;

  let offset = page * limit;
  let criteria = {};
  // if (user_id) criteria.user_id = user_id;
  criteria.user_id = req.user._id;

  try {
    const response = await Order.find(
      criteria,
      {},
      { skip: offset, limit }
    ).populate("destination");

    const count = await Order.find(criteria).countDocuments();

    return res.status(200).send({
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

exports.get_order_by_id = async (req, res, next) => {
  const { order_id } = req.params;
  try {
    const response = await Order.findOne({ _id: order_id });
    if (!response) return res.status(404).json({ message: "Order not found" });
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_order = async (req, res, next) => {
  const user_id = req.user._id;
  const { cart_id, address_id, total_amount } = req.body;

  try {
    const user_cart = await Cart.findById(cart_id).populate("products.product");

    const cart_products = user_cart.products.map(
      ({ product, quantity, total_price }) => {
        const { _id, name, image, category } = product;
        return {
          product_id: _id,
          name,
          category,
          image,
          quantity,
          total_price,
        };
      }
    );

    await user_cart.products.map(async (product_obj) => {
      const product = await Product.findOne({
        _id: product_obj.product,
      });
      product.stock = product.stock - product_obj.quantity;
      await product.save();
    });

    const response = await Order.create({
      user_id: user_id,
      products: cart_products,
      destination: address_id,
      total_amount: total_amount,
    });

    // clear cart
    const cart = await Cart.findOne({ _id: cart_id });
    cart.products = [];
    await cart.save();

    return res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_order = async (req, res, next) => {
  const { order_id } = req.params;
  const { status } = req.body;
  try {
    const opts = { runValidators: true };
    const response = await Order.findOneAndUpdate(
      { _id: order_id },
      { status }
    );
    res.status(200).json({ message: "Order updated successfully." });
  } catch (error) {}
};

exports.delete_order = async (req, res, next) => {
  const { order_id } = req.params;
  try {
    const response = await Order.findOneAndDelete({ _id: order_id });
    return res.status(200).json({ message: "Order deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
