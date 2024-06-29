const mongoose = require("mongoose");

const PaymentMethod = new mongoose.Schema(
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

const PaymentMethodModel = mongoose.model("paymentMethods", PaymentMethod);
module.exports = PaymentMethodModel;
