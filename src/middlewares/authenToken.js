const jwt = require("jsonwebtoken");

const authenToken = async (req, res, next) => {
  const accessToken = req.cookies.access_token;
  console.log({ accessToken });
  if (!accessToken) {
    return res.status(401).json({
      error: "Unauthorized !",
      code: "401",
      message: "Not authorized to access this resource!",
    });
  }

  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.accessTokenVerify = data;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized !",
      code: "401",
      message: "Not authorized to access this resource!",
    });
  }
};
module.exports = {
  authenToken,
};
