const Post = require("../../models/posts.model");

const getAllPostsService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const posts = await Post.find().skip(startIndex).limit(limit);
  const totalCount = await Post.countDocuments();
  if (posts.length === 0) throw { message: "Posts not found!", code: 404 };
  return {
    posts,
    totalCount,
  };
};

const getPostByIdService = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) throw { message: "Post not found!", code: 404 };
  return post;
};

const getRelatedPostsService = async (postId) => {
  const relatedPosts = await Post.find({
    _id: { $ne: postId },
  }).limit(4);
  return relatedPosts;
};

module.exports = {
  getAllPostsService,
  getPostByIdService,
  getRelatedPostsService,
};
