const { successHandler, errorHandler } = require("../../helper/response");
const {
  getAllCategoriesService,
  getCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
} = require("../../services/admin/categories.service");
const { paginateUtil } = require("../../utils/pagination");

const getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const { categories, totalCount } = await getAllCategoriesService(
      page,
      limit
    );
    const paginate = await paginateUtil(req, totalCount);
    successHandler(
      res,
      {
        paginate,
        categories,
      },
      "Categories fetched successfully!",
      200
    );
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
    const { body } = req.body;
    const updatedCategory = await updateCategoryService(categoryId, body);
    successHandler(res, updatedCategory, "Category updated successfully!", 200);
  } catch (error) {
    console.log(error);
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
