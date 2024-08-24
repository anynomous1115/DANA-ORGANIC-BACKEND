const { errorHandler, successHandler } = require("../../helper/response");
const {
  registerServic,
  loginService,
  checkUserLoginService,
  logoutService,
  resetPasswordService,
} = require("../../services/v1/auth.service");
const { createCartsService } = require("../../services/v1/carts.service");

const register = async (req, res) => {
  try {
    const { password, rePassword } = req.body;
    if (rePassword !== password) {
      errorHandler(res, "Bad Request !", 400, "Confirm Password is incorrect!");
      return;
    }
    const customer = await registerServic(req.body);
    await createCartsService(customer._id);
    successHandler(res, customer, "Customer registered successfully!", 201);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { access_token } = req.cookies;
    if (access_token) {
      throw { message: "You are logged in", code: 400 };
    }

    const { accessToken, ageToken } = await loginService(email, password);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: ageToken * 1000,
    });
    successHandler(res, { accessToken }, "Logged in successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const logout = async (req, res) => {
  try {
    const { access_token } = req.cookies;
    if (!access_token) {
      throw { message: "You are not logged in!", code: 400 };
    }
    const { _id } = req.user;
    await logoutService(_id, access_token);
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ code: 200, message: "Successfully logged out!" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const checkUserLogin = async (req, res) => {
  try {
    const isExistingUser = await checkUserLoginService(req.accessTokenVerify);
    if (isExistingUser) {
      const { email } = isExistingUser;
      successHandler(res, email, "You are logged in", 200);
    } else {
      errorHandler(res, "You are not logged in!", 400);
      return;
    }
  } catch (error) {
    errorHandler(res, "Bad Request !", 400, error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    if (password === newPassword) {
      throw {
        message: "New password must be different from old password",
        code: 400,
      };
    }
    const { _id } = req.user;
    await resetPasswordService(_id, password, newPassword);
    successHandler(res, {}, "Password reset successfully!", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  register,
  login,
  logout,
  checkUserLogin,
  resetPassword,
};
