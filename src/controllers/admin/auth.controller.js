const { successHandler, errorHandler } = require("../../helper/response");
const {
  loginAdminService,
  logoutAdimService,
} = require("../../services/admin/auth.service");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const { accessToken, ageToken } = await loginAdminService(email, password);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: ageToken * 1000,
    });
    successHandler(res, { accessToken }, "Logged in successfully!", 200);
  } catch (error) {
    console.error(error);
    errorHandler(res, error);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { access_token } = req.cookies;
    if (!access_token) {
      throw { message: "You are not logged in!", code: 400 };
    }
    const { _id } = req.user;
    await logoutAdimService(_id, access_token);
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ code: 200, message: "Successfully logged out!" });
  } catch (error) {
    console.error(error);
    errorHandler(res, error);
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
};
