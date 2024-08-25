const { successHandler, errorHandler } = require("../../helper/response");
const {
  getAllCommentsService,
  sendCommentService,
  deleteCommentService,
} = require("../../services/v1/comments.service");
const { paginateUtil } = require("../../utils/pagination");

const getAllComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const { comments, totalCount } = await getAllCommentsService(
      postId,
      page,
      limit
    );
    const paginate = await paginateUtil(req, totalCount);
    successHandler(
      res,
      { comments, paginate },
      "Comments fetched successfully!",
      200
    );
  } catch (error) {
    errorHandler(res, error);
  }
};

const sendComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { _id } = req.user;
    const { contents } = req.body;
    const comment = await sendCommentService(postId, _id, contents);
    successHandler(res, comment, "Comment sent successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const commentDeleted = await deleteCommentService(id);
    successHandler(res, commentDeleted, "Comment deleted successfully!", 200);
  } catch (error) {
    console.error(error);
    errorHandler(res, error);
  }
};

module.exports = {
  getAllComments,
  sendComment,
  deleteComment,
};
