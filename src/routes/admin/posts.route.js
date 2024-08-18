const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/admin/posts.controller");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const router = express.Router();

router.get("/",checkAuth, authorize(role.admin), getAllPosts);
router.get("/:id",checkAuth, authorize(role.admin), getPostById);
router.post("/",checkAuth, authorize(role.admin), createPost);
router.put("/:id",checkAuth, authorize(role.admin), updatePost);
router.delete("/:id",checkAuth, authorize(role.admin), deletePost);

module.exports = router;
