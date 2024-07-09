const Category = require("../../models/categories.model");

const getAllCategoriesService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const categories = await Category.find().skip(startIndex).limit(limit).exec();
  if (categories.length === 0) {
    throw { message: "Categories not found!", code: 404 };
  }

  return data;
};

const getCategoryService = async (id) => {
  const category = await Category.findById(id).exec();
  if (!category) {
    throw { message: "Category not found!", code: 404 };
  }
  return category;
};

const createCategoryService = async (category) => {
  const newCategory = new Category(category);
  return await newCategory.save();
};

const updateCategoryService = async (id, category) => {
  const updatedCategory = await Category.findByIdAndUpdate(id, category, {
    new: true,
  });
  if (!updatedCategory) {
    throw { message: "Category not found!", code: 404 };
  }
  return updatedCategory;
};

const deleteCategoryService = async (id) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    throw { message: "Category not found!", code: 404 };
  }
  return deletedCategory;
};

module.exports = {
  getAllCategoriesService,
  getCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService
};
