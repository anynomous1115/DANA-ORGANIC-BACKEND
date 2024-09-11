const { errorHandler, successHandler } = require("../../helper/response");
const {
  getAllPostsService,
  getPostByIdService,
  getRelatedPostsService,
} = require("../../services/v1/posts.service");
const { paginateUtil } = require("../../utils/pagination");

const getAllPosts = async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 5;
    // const { posts, totalCount } = await getAllPostsService(page, limit);
    // const paginate = await paginateUtil(req, totalCount);

    const { posts } = await getAllPostsService();
    successHandler(
      res,
      { posts },
      "Posts fetched successfully!",
      200
    );
  } catch (error) {
    errorHandler(res, error);
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await getPostByIdService(postId);
    successHandler(res, post, "Post fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getRelatedPosts = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await getRelatedPostsService(postId);
    successHandler(res, post, "Related PostS fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  getAllPosts,
  getPostById,
  getRelatedPosts,
};
