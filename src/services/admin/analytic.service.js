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
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$productDetails.categoryId",
        totalRevenueCategory: {
          $sum: { $multiply: ["$productDetails.price", "$quantity"] },
        },
      },
    },
  ]);


  const totalRevenueByCategory = await Promise.all(
    revenueByCategory.map(async (i) => {
      const category = await Category.findById(i._id);
      return {
        category: category ? category.categoryName : 'Unknown', 
        totalRevenue: i.totalRevenueCategory,
      };
    })
  );

  const revenuePercentage = totalRevenueByCategory.map((i) => {
    const percentage =
      (i.totalRevenue / (totalRevenue[0]?.totalRevenueByAll || 1)) * 100;
    return {
      category: i.category,
      percentage: percentage.toFixed(2),
    };
  });

  const analytics = {
    totalOrders,
    totalRevenue: totalRevenue[0]?.totalRevenueByAll || 0,
    totalOrdersProducts: ordersProducts[0]?.totalProducts || 0,
    totalRevenueByCategory,
    revenuePercentage,
  };

  return analytics;
};

module.exports = {
  getAnalyticService,
};
