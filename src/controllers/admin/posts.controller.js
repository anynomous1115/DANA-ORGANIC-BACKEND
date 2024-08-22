const { errorHandler, successHandler } = require("../../helper/response");
const {
  getAllPostsService,
  getPostByIdService,
  deletePostService,
  updatePostService,
  createPostService,
} = require("../../services/admin/posts.service");
const { paginateUtil } = require("../../utils/pagination");

const getAllPosts = async (req, res) => {
  try {
    const paginate = await paginateUtil(req);

    const posts = await getAllPostsService(paginate.startIndex, paginate.limit);
    successHandler(res, posts, "Posts fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await getPostByIdService(id);
    successHandler(res, post, "Post fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const createPost = async (req, res) => {
  try {
    const post = await createPostService(req.body);
    successHandler(res, post, "Post created successfully!", 201);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await updatePostService(id, req.body);
    successHandler(res, post, "Post updated successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await deletePostService(id);
    successHandler(res, post, "Post deleted successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
