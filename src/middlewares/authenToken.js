const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helper/response");
const { getToken } = require("../repositories/token.repository");

const checkAuth = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    console.log("accessToken:", accessToken);
    if (!accessToken) {
      throw { message: "Unauthorized !", code: 401 };
    }
    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decode) throw { message: "Unauthorized !", code: 401 };

    const token = await getToken(decode._id);
    if (!token) {
      throw { message: "Unauthorized !", code: 401 };
    }

    req.user = decode;
    req.accessTokenVerify = accessToken;
    next();
  } catch (error) {
    errorHandler(res, error);
  }
};

const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(403).json({ message: "Forbidden" });
      }

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error) {
      errorHandler(res, error);
    }
  };
};

module.exports = { checkAuth, authorize };
