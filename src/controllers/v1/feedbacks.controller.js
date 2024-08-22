const { successHandler, errorHandler } = require("../../helper/response");
const {
  getAllFeedbacksService,
  sendFeedbackService,
  deleteFeedbackService,
} = require("../../services/v1/feedbacks.service");
const { paginateUtil } = require("../../utils/pagination");

const getAllFeedbacks = async (req, res) => {
  try {
    const productId = req.params.id;
    const paginate = await paginateUtil(req);
    const feedbacks = await getAllFeedbacksService(
      productId,
      paginate.startIndex,
      paginate.limit
    );
    successHandler(res, feedbacks, "Feedbacks fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const sendFeedback = async (req, res) => {
  try {
    const productId = req.params.id;
    const { _id } = req.user;
    const { contents } = req.body;
    const feedback = await sendFeedbackService(productId, _id, contents);
    successHandler(res, feedback, "Feedback sent successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const id = req.params.id;
    const feedbackDeleted = await deleteFeedbackService(id);
    successHandler(res, feedbackDeleted, "Feedback deleted successfully!", 200);
  } catch (error) {
    console.error(error);
    errorHandler(res, error);
  }
};

module.exports = {
  getAllFeedbacks,
  sendFeedback,
  deleteFeedback,
};
