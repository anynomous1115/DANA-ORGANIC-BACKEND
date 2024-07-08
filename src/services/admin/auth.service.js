const Admin = require("../../models/admin.model");

const loginAdminService = async (email, password) => {
  const isAdminEmail = await Admin.findOne({ email });
  const isPassword = await isAdminEmail.comparePassword(password);
  if (!isAdminEmail || !isPassword) {
    throw { message: "Email or password is incorrect !", code: 401 };
  }
  const ageToken = 3600;
  const accessToken = jwt.sign(
    { _id: customer._id }, //data input
    process.env.ACCESS_TOKEN_SECRET, //secret key-
    { expiresIn: "1h" } //expired time
  );
  return {
    accessToken,
    ageToken,
  };
};

module.exports = {
  loginAdminService,
};
