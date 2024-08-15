const { successHandler, errorHandler } = require("../../helper/response");
const { loginAdminService } = require("../../services/admin/auth.service");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const { accessToken, ageToken } = await loginAdminService(email, password);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: ageToken * 1000,
    });
    successHandler(res, {}, "Logged in successfully!", 200);
  } catch (error) {
    console.error(error);
    errorHandler(res, error);
  }
};

module.exports = {
  loginAdmin,
};
