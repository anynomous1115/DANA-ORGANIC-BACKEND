const { successHandler, errorHandler } = require("../../helper/response");
const {
  getAllCategoriesService,
  getCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../../services/admin/categories.service");
const { paginate } = require("../../utils/pagination");

const getAllCategories = async (req, res) => {
  try {
    const paginate = await paginate(req);
    const categories = await getAllCategoriesService(
      paginate.startIndex,
      paginate.limit
    );
    successHandler(res, categories, "Categories fetched successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryService(categoryId);
    successHandler(res, category, "Categories fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const createCategory = async (req, res) => {
  try {
    const category = req.body;
    const createdCategory = await createCategoryService(category);
    successHandler(res, createdCategory, "Category created successfully!", 201);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = req.body;
    const updatedCategory = await updateCategoryService(categoryId, category);
    successHandler(res, updatedCategory, "Category updated successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await deleteCategoryService(categoryId);
    successHandler(res, deletedCategory, "Category deleted successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
