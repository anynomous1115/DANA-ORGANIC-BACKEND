const Customer = require("../../models/customers.model");
const Post = require("../../models/posts.model");

const getAllPostsService = async (startIndex, limit) => {
  const posts = await Post.find().skip(startIndex).limit(limit).exec();
  if (posts.length === 0) {
    throw { message: "Posts not found!", code: 404 };
  }
  return posts;
};

const getPostByIdService = async (id) => {
  const post = await Post.findById(id).exec();
  if (!post) {
    throw { message: "Post not found!", code: 404 };
  }

  const commentsents = await Comment.find({ postId: post._id }).exec();
  if (comments.length === 0) {
    throw { message: "Comments not found!", code: 404 };
  }
  const comments = commentsents.map((comment) => {
    const customer = Customer.findById(comment.customerId).exec();
    if (!customer) {
      throw { message: "Customer not found!", code: 404 };
    }
    return {
      ...comment,
      customer,
    };
  });
  return {
    post,
    comments,
  };
};

const createPostService = async (data) => {
  const newPost = new Post(data);
  return await newPost.save();
};

const updatePostService = async (id, data) => {
  const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
  if (!updatedPost) {
    throw { message: "Post not found!", code: 404 };
  }
  return updatedPost;
};

const deletePostService = async (id) => {
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    throw { message: "Post not found!", code: 404 };
  }
  return deletedPost;
};

module.exports = {
  getAllPostsService,
  getPostByIdService,
  createPostService,
  updatePostService,
  deletePostService,
};
