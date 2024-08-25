const express = require("express");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const {
  getAllFeedbacks,
  sendFeedback,
  deleteFeedback,
} = require("../../controllers/v1/feedbacks.controller");
const router = express.Router();

router.get("/:id", getAllFeedbacks);
router.post(
  "/:id/send-feedback",
  checkAuth,
  authorize(role.customer),
  sendFeedback
);

router.delete(
  "/:id/delete-feedback",
  checkAuth,
  authorize(role.customer),
  deleteFeedback
);

module.exports = router;
