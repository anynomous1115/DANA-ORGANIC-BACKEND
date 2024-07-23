const { not } = require("joi");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  paymentStatus:{
    type: String,
    required: true,
  }
});

const Order = mongoose.model("orders", OrderSchema);
module.exports = Order;
