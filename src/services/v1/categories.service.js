const Category = require("../../models/categories.model");

const getAllCategoriesService = async () => {
  const categories = await Category.find();
  if (categories.length === 0) {
    throw { message: "Categories not found!", code: 404 };
  }
  return categories;
};
module.exports = {
  getAllCategoriesService,
};
