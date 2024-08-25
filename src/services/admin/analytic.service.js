const OrderProduct = require("../../models/orders-products.model");
const Order = require("../../models/orders.model");

const getAnalyticService = async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Tháng hiện tại (1-12)
  const currentYear = currentDate.getFullYear();

  const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

  const orders = await Order.find({
    createdAt: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  });
  const subTotal = await Promise.all(
    orders.map(async (order) => {
      
      return total;
    })
  );
  return analytic;
};
