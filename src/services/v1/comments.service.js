const Comment = require("../../models/comments.model");

const getAllCommentsService = async (postId, page, limit) => {
  const startIndex = (page - 1) * limit;
  const comments = await Comment.find({ postId })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);
  const totalCount = await Comment.countDocuments({ postId });
  if (!comments) {
    throw {
      code: 404,
      message: "Comments not found!",
    };
  }
  return {
    comments,
    totalCount,
  };
};

const sendCommentService = async (postId, customerId, contents) => {
  const newComment = new Comment({
    contents,
    postId,
    customerId,
  });
  const comment = await newComment.save();
  return comment;
};

const deleteCommentService = async (id) => {
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) {
    throw {
      code: 404,
      message: "Comment not found!",
    };
  }
  return comment;
};

module.exports = {
  getAllCommentsService,
  sendCommentService,
  deleteCommentService,
};
