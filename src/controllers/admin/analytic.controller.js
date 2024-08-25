const { successHandler } = require("../../helper/response");

const getAnalytic = async (req, res) => {
  try {
    const analytic = await analyticService.getAnalytic();
    successHandler(res, analytic, "Get analytic success", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  getAnalytic,
};
