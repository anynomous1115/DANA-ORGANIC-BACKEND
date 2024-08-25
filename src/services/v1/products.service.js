const Product = require("../../models/products.model");

const getLatestProductsService = async () => {
  const products = await Product.find().sort({ createdAt: -1 }).limit(8);
  return products;
};

const getAllProductsService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const products = await Product.find().skip(startIndex).limit(limit).exec();
  const totalCount = await Product.countDocuments();
  if (products.length === 0) {
    throw { message: "Products not found!", code: 404 };
  }
  return {
    products,
    totalCount,
  };
};

const getSimilarProductsService = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw { message: "Product not found!", code: 404 };
  }
  const similarProducts = await Product.find({
    categoryId: product.categoryId,
  }).limit(4);
  if (similarProducts.length === 0) {
    throw { message: "Similar products not found!", code: 404 };
  }

  return similarProducts;
};

const getRecommendedProductsService = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw { message: "Product not found!", code: 404 };
  }

  const recommendedProducts = await Product.find({
    _id: { $ne: productId },
  }).limit(6);

  if (recommendedProducts.length === 0) {
    throw { message: "Recommended products not found!", code: 404 };
  }

  return recommendedProducts;
};

module.exports = {
  getLatestProductsService,
  getAllProductsService,
  getSimilarProductsService,
  getRecommendedProductsService,
};
