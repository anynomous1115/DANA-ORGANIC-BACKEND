const mongoose = require("mongoose");
const Category = require("../../models/categories.model");
const OrderProduct = require("../../models/orders-products.model");
const Product = require("../../models/products.model");

const getAllProductsService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const products = await Product.find().skip(startIndex).limit(limit).exec();
  if (products.length === 0) {
    throw { message: "Products not found!", code: 404 };
  }

  const data = await Promise.all(
    products.map(async (product) => {
      const { categoriesId } = product;
      const category = await Category.findById(categoriesId);
      return {
        ...product.toObject(),
        category: category,
      };
    })
  );

  return data;
};

const getProductService = async (id) => {
  const product = await Product.findById(id).exec();
  if (!product) {
    throw { message: "Product not found!", code: 404 };
  }
  return product;
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
  const checkOrderProducts = await OrderProduct.find(id);
  if(checkOrderProducts){
    throw { message: "Product is still in the cart", code: 404 };
  }
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
