const Category = require("../../models/categories.model");

const getAllCategoriesService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const categories = await Category.find().skip(startIndex).limit(limit).exec();
  const totalCount = await Category.countDocuments();
  if (categories.length === 0) {
    throw { message: "Categories not found!", code: 404 };
  }
  console.log(categories, totalCount);

  return {
    categories,
    totalCount,
  };
};

const getCategoryService = async (id) => {
  const category = await Category.findById(id).exec();
  if (!category) {
    throw { message: "Category not found!", code: 404 };
  }
  return category;
};

const createCategoryService = async (category) => {
  const categoryExist = await Category.findOne({
    categoryName: category.categoryName,
  }).exec();
  if (categoryExist) {
    throw { message: "Category already exists!", code: 400 };
  }

  const newCategory = new Category(category);
  return await newCategory.save();
};

const updateCategoryService = async (id, categoryName) => {
  const cleanedData = categoryName.split('"').join("");

  const category = await Category.findById(id).exec();
  if (!category) {
    throw { message: "Category not found!", code: 404 };
  }
  category.categoryName = cleanedData;
  await category.save();

  console.log(category);
  return category;
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
  deleteCategoryService,
};
