const { errorHandler, successHandler } = require("../../helper/response");
const {
  registerServic,
  loginService,
  checkUserLoginService,
} = require("../../services/v1/auth.service");

const register = async (req, res) => {
  try {
    const { password, rePassword } = req.body;
    if (rePassword !== password) {
      errorHandler(res, "Bad Request !", 400, "Confirm Password is incorrect!");
      return;
    }
    await registerServic(req.body);
    successHandler(res, null, "Customer registered successfully!", 201);
  } catch (error) {
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
    successHandler(res, {}, "Logged in successfully!", 200);
  } catch (error) {
    console.error(error);
    errorHandler(res, error);
  }
};

const logout = async (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ code: 200, message: "Successfully logged out!" });
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

module.exports = {
  register,
  login,
  logout,
  checkUserLogin,
};
