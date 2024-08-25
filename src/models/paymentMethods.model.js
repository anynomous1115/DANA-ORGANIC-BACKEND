const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema(
  {
    methodName: {
      type: String,
      required: true,
    },
    methodDescription: {
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
