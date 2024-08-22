const { errorHandler, successHandler } = require("../../helper/response");
const {
  getAllCategoriesService,
} = require("../../services/v1/categories.service");

const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();
    successHandler(res, categories, "Get all categories successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getAllCategories,
};
