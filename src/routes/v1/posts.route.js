const express = require("express");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const {
  getAllPosts,
  getPostById,
  getRelatedPosts,
} = require("../../controllers/v1/posts.controller");
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get(
  "/:id/related",
  checkAuth,
  authorize(role.customer),
  getRelatedPosts
);

module.exports = router;
