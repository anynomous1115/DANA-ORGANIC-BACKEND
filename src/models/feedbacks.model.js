const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    contents: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
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
