const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helper/response");
const { getToken } = require("../repositories/token.repository");

const checkAuth = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  try {
    console.log("accessToken:", accessToken);
    if (!accessToken) {
      throw { message: "Unauthorized1 !", code: 401 };
    }
    let decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!decode) throw { message: "Unauthorized2 !", code: 401 };

    const token = await getToken(decode._id);
    if (!token) {
      throw { message: "Unauthorized3 !", code: 401 };
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
        return res.status(403).json({ message: "Forbiddendcdss" });
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
