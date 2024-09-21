const { default: mongoose } = require("mongoose");
const Category = require("../../models/categories.model");
const OrderProduct = require("../../models/orders-products.model");
const Product = require("../../models/products.model");
const { getCategoryService } = require("./categories.service");
const Order = require("../../models/orders.model");

const getAllProductsService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const products = await Product.find().skip(startIndex).limit(limit).exec();
  const totalCount = await Product.countDocuments();
  if (products.length === 0) {
    throw { message: "Products not found!", code: 404 };
  }

  const data = await Promise.all(
    products.map(async (product) => {
      const { categoryId } = product;
      const category = await Category.findById(categoryId);
      console.log(category);
      console.log(categoryId);

      return {
        ...product.toObject(),
        category: category,
      };
    })
  );
  return {
    data,
    totalCount,
  };
};

const getProductService = async (productId) => {
  const product = await Product.findById(productId).exec();
  if (!product) {
    throw { message: "Product not found!", code: 404 };
  }
  const { categoryId } = product;
  const category = await getCategoryService(categoryId);

  const newProductwProduct = {
    ...product.toObject(),
    categoryName: category.categoryName,
  };
  return newProductwProduct;
};

const createProductService = async (product) => {
  const productExist = await Product.findOne({
    productName: product.productName,
  }).exec();
  if (productExist) {
    throw { message: "Product already exists!", code: 400 };
  }

  const newProduct = new Product(product);
  return await newProduct.save();
};

const updateProductService = async (id, product) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  });
  if (!updatedProduct) {
    throw { message: "Product not found!", code: 404 };
  }
  return updatedProduct;
};

const deleteProductService = async (id) => {
  const checkOrderProducts = await OrderProduct.find({ productId: id });
  await Promise.all(
    checkOrderProducts.map(async (i) => {
      const order = await Order.findById(i.orderId);
      if (order.status === 1) {
        throw { message: "Product is still in the order", code: 404 };
      }
    })
  );

  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw { message: "Product not found!", code: 404 };
  }
  return deletedProduct;
};

module.exports = {
  getAllProductsService,
  getProductService,
  createProductService,
  updateProductService,
  deleteProductService,
};
