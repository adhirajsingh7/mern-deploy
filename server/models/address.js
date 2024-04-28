const { mongoose, Schema } = require("mongoose");

const address_schema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    flat_no: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    address_type: {
      type: String,
      enum: ["home", "office", "other"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

exports.Address = mongoose.model("Address", address_schema);
