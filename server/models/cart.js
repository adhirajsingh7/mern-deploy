const { mongoose, Schema } = require("mongoose");

const cart_item_schema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
  },
  total_price: {
    type: Number,
  },
});

const cart_schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [cart_item_schema],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

exports.Cart = mongoose.model("Cart", cart_schema);
