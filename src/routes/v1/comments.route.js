const express = require("express");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const {
  getAllComments,
  sendComment,
  deleteComment,
} = require("../../controllers/v1/comments.controller");
const router = express.Router();

router.get("/:id", checkAuth, authorize(role.customer), getAllComments);
router.post(
  "/:id/send-comment",
  checkAuth,
  authorize(role.customer),
  sendComment
);

router.delete(
  "/:id/delete-comment",
  checkAuth,
  authorize(role.customer),
  deleteComment
);

module.exports = router;
