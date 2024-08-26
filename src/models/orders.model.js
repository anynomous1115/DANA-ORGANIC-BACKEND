const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "locations",
      required: true,
    },
    paymentMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "paymentMethods",
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: false,
      default: 1,
    },
    note: {
      type: String,
      required: false,
    },

    id_payment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;
