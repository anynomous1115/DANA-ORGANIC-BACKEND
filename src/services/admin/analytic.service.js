const OrderProduct = require("../../models/orders-products.model");
const Order = require("../../models/orders.model");

const getAnalyticService = async () => {
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$subTotal" },
      },
    },
  ]);
  return {
    totalOrders: totalOrders,
    totalRevenue: totalRevenue,
  };
};

module.exports = {
  getAnalyticService,
};
