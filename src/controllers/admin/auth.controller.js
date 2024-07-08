const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { access_token } = req.cookies;
    if (access_token) {
      throw { message: "You are logged in", code: 400 };
    }
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
