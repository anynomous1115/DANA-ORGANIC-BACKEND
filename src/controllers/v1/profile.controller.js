const { errorHandler, successHandler } = require("../../helper/response");
const {
  getProfileByCustomerService,
  updateProfileByCustomerService,
} = require("../../services/v1/profile.service");

const getProfileByCustomer = async (req, res) => {
  try {
    const { _id } = req.user;
    const profile = await getProfileByCustomerService(_id);
    successHandler(res, profile, "Get profile successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const updateProfileByCustomer = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { _id } = req.user;
    const profile = await updateProfileByCustomerService(_id, req.body);
    successHandler(res, profile, "Update profile successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  getProfileByCustomer,
  updateProfileByCustomer,
};
