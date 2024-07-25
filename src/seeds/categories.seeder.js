require("dotenv").config();
const Category = require("../models/categories.model");
const categories = [
  {
    categoryName: "Electronics",
    description: "High-quality electronics products for everyday use.",
  },
  {
    categoryName: "Clothing",
    description: "Stylish and comfortable clothing options for all occasions.",
  },
  {
    categoryName: "Home Decor",
    description: "Curate your living space with our unique home decor items.",
  },
  {
    categoryName: "Books",
    description: "Discover a wide range of books across various genres.",
  },
  {
    categoryName: "Sports Equipment",
    description: "High-performance sports equipment for active lifestyles.",
  },
];

const { connectDB } = require("../configs/database");
connectDB();

const importCategoriesData = async () => {
  console.log("đajasgdashjdjasjhd");
  try {
    await Category.deleteMany({});
    await Category.insertMany(categories);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  importCategoriesData,
};
