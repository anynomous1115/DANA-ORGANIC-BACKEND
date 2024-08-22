const Feedback = require("../../models/feedbacks.model");

const getAllFeedbacksService = async (productId, startIndex, limit) => {
  const feedbacks = await Feedback.find({ productId })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(limit);
  if (!feedbacks) {
    throw {
      code: 404,
      message: "Feedbacks not found!",
    };
  }
  return feedbacks;
};

const sendFeedbackService = async (productId, customerId, contents) => {
  const newFeedback = new Feedback({
    contents,
    productId,
    customerId,
  });
  const feedback = await newFeedback.save();
  return feedback;
};

const deleteFeedbackService = async (id) => {
  const feedback = await Feedback.findByIdAndDelete(id);
  if (!feedback) {
    throw {
      code: 404,
      message: "Feedback not found!",
    };
  }
  return feedback;
};

module.exports = {
  getAllFeedbacksService,
  sendFeedbackService,
  deleteFeedbackService,
};
