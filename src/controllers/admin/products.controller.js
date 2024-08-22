const { successHandler, errorHandler } = require("../../helper/response");
const {
  getAllProductsService,
  getProductService,
  createProductService,
  updateProductService,
  deleteProductService,
} = require("../../services/admin/products.service");
const { paginateUtil } = require("../../utils/pagination");

const getAllProducts = async (req, res) => {
  try {
    const paginate = await paginateUtil(req);
    const products = await getAllProductsService(
      paginate.startIndex,
      paginate.limit
    );
    successHandler(res, products, "Products fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductService(productId);
    successHandler(res, product, "Product fetched successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const createdProduct = await createProductService(product);
    console.log(createdProduct);
    successHandler(res, createdProduct, "Product created successfully!", 201);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = req.body;
    const updatedProduct = await updateProductService(productId, product);
    successHandler(res, updatedProduct, "Product updated successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await deleteProductService(productId);
    successHandler(res, deletedProduct, "Product deleted successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
