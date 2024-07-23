const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema(
  {
    nameMethod: {
      type: String,
      required: true,
    },
    descriptionMethod: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentMethod = mongoose.model("paymentMethods", PaymentMethodSchema);
module.exports = PaymentMethod;
