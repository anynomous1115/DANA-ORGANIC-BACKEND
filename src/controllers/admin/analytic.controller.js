const { successHandler, errorHandler } = require("../../helper/response");
const { getAnalyticService } = require("../../services/admin/analytic.service");

const getAnalytic = async (req, res) => {
  try {
    const { totalOrders, totalRevenue } = await getAnalyticService();
    successHandler(
      res,
      { totalOrders, totalRevenue },
      "Get analytic success",
      200
    );
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  getAnalytic,
};
