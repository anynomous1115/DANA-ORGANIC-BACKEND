const { successHandler, errorHandler } = require("../../helper/response");
const { getAnalyticService } = require("../../services/admin/analytic.service");

const getAnalytic = async (req, res) => {
  try {
    const analytics = await getAnalyticService();
    successHandler(res, analytics, "Get analytic success", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  getAnalytic,
};
