const Category = require("../../models/categories.model");
const OrderProduct = require("../../models/orders-products.model");
const Order = require("../../models/orders.model");

const getAnalyticService = async () => {
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenueByAll: { $sum: "$subTotal" },
      },
    },
  ]);
  const ordersProducts = await OrderProduct.aggregate([
    {
      $group: {
        _id: null,
        totalProducts: { $sum: "$quantity" },
      },
    },
  ]);

  const revenueByCategory = await OrderProduct.aggregate([
    {
      $lookup: {
        from: "products", // Tên collection chứa thông tin sản phẩm
        localField: "productId", // Trường trong OrderProduct
        foreignField: "_id", // Trường trong Products
        as: "productDetails", // Tên trường mới sẽ chứa thông tin sản phẩm
      },
    },
    {
      $unwind: "$productDetails", // Giải nén mảng productDetails
    },
    {
      $group: {
        _id: "$productDetails.categoryId", // Nhóm theo categoryId
        totalRevenueCategory: {
          $sum: { $multiply: ["$productDetails.price", "$quantity"] },
        }, // Tính tổng doanh thu
      },
    },
  ]);
  const totalRevenueByCategory = await Promise.all(
    revenueByCategory.map(async (i) => {
      const category = await Category.findById(i._id);

      return {
        category: category.categoryName,
        totalRevenue: i.totalRevenueCategory,
      };
    })
  );

  const revenuePercentage = totalRevenueByCategory.map((i) => {
    const category = i.category;
    const totalRevenueCategory = i.totalRevenue;
    const percentage =
      (totalRevenueCategory / totalRevenue[0].totalRevenueByAll) * 100;
    return {
      category: category,
      percentage: percentage.toFixed(2),
    };
  });
  const analytics = {
    totalOrders: totalOrders,
    totalRevenue: totalRevenue,
    totalOrdersProducts: ordersProducts,
    totalRevenueByCategory: totalRevenueByCategory,
    revenuePercentage: revenuePercentage,
  };
  return analytics;
};

module.exports = {
  getAnalyticService,
};
