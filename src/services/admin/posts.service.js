const Comment = require("../../models/comments.model");
const Customer = require("../../models/customers.model");
const Post = require("../../models/posts.model");

const getAllPostsService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const posts = await Post.find().skip(startIndex).limit(limit).exec();
  const totalCount = await Post.countDocuments();
  if (posts.length === 0) {
    throw { message: "Posts not found!", code: 404 };
  }
  return {
    posts,
    totalCount,
  };
};

const getPostByIdService = async (id) => {
  const post = await Post.findById(id).exec();
  if (!post) {
    throw { message: "Post not found!", code: 404 };
  }
  const commentsents = await Comment.find({ postId: post._id }).exec();
  if (commentsents.length > 0) {
    const comments = await Promise.all(
      commentsents.map(async (comment) => {
        const customer = await Customer.findById(comment.customerId).exec();
        console.log(customer);

        if (!customer) {
          throw { message: "Customer not found!", code: 404 };
        }
        return {
          ...comment.toObject(),
          customer: customer.fullname,
        };
      })
    );
    return {
      post,
      comments,
    };
  }
  return {
    post,
    commentsents,
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
