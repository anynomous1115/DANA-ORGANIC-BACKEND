const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
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

const Comment = mongoose.model("comments", CommentSchema);
module.exports = Comment;
