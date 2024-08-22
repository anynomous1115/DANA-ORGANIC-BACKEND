const Post = require("../../models/posts.model");

const getAllPostsService = async (startIndex, limit) => {
  const posts = await Post.find().skip(startIndex).limit(limit);
  if (posts.length === 0) throw { message: "Posts not found!", code: 404 };
  return posts;
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
