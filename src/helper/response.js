const errorHandler = (res, error) => {
  const code = error.code || 500;
  const message = error.message || "Internal Server Error";
  res.status(code).json({
    message,
    code,
  });
};
const successHandler = (res, data, message = "Successful", code = 200) => {
  res.status(code).json({
    data: data,
    message: message,
    code: code,
  });
};
module.exports = {
  errorHandler,
  successHandler,
};
