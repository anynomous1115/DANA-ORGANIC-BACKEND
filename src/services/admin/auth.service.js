const Admin = require("../../models/admin.model");

const loginAdminService = async (email, password) => {
  console.log(email, password);
  const admin = await Admin.findOne({ email: email }).exec();
  console.log(admin);
  if (!admin) {
    throw { message: "Email or password is incorrect !", code: 401 };
  }
  const isPassword = await admin.comparePassword(password);
  console.log(isPassword);
  if (!isPassword) {
    throw { message: "Email or password is incorrect !", code: 401 };
  }
  const ageToken = 3600;
  const accessToken = jwt.sign(
    { _id: admin._id }, //data input
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
