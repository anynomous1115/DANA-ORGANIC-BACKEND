const mongoose = require("mongoose");

const ProductCartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: { type: String }, 
  },
  {
    timestamps: true,
  }
);
const ProductCart = mongoose.model("productsCarts", ProductCartSchema);
module.exports = ProductCart;
