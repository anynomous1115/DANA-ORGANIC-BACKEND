const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    contents: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("feedbacks", FeedbackSchema);
module.exports = Feedback;
