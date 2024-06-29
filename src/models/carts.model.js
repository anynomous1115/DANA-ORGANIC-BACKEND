const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("carts", CartSchema);

module.exports = Cart;
