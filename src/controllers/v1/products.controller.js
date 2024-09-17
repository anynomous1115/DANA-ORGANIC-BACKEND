const { errorHandler, successHandler } = require("../../helper/response");
const { getProductService } = require("../../services/admin/products.service");
const {
  getLatestProductsService,
  getAllProductsService,
  getSimilarProductsService,
  getRecommendedProductsService,
} = require("../../services/v1/products.service");
const { paginateUtil } = require("../../utils/pagination");

const getLatestProducts = async (req, res) => {
  try {
    const result = await getLatestProductsService();
    successHandler(res, result, "Get latest product successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 5;
    // const { products, totalCount } = await getAllProductsService(page, limit);
    // const paginate = await paginateUtil(req, totalCount);

    const { products } = await getAllProductsService();
    successHandler(
      res,
      { products },
      "Get all products successfully!",
      200
    );
  } catch (error) {
    errorHandler(res, error);
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductService(productId);
    successHandler(res, product, "Product fetched successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getSimilarProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getSimilarProductsService(productId);
    successHandler(res, product, "Similar products fetched successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getRecommendedProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getRecommendedProductsService(productId);
    successHandler(
      res,
      product,
      "Recommended products fetched successfully!",
      200
    );
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  getLatestProducts,
  getAllProducts,
  getProductById,
  getSimilarProducts,
  getRecommendedProducts,
};
