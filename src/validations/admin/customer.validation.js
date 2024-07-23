const Joi = require("joi");
const { password } = require("../custom.validation");

const customerValidation = (data) => {
  const customerSchema = Joi.object({
    fullname: Joi.string().allow(null),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().custom(password),
    rePassword: Joi.string().required().valid(Joi.ref("password")),
    Dob: Joi.date().required(),
  });
  return customerSchema.validate(data);
};
module.exports = {
  customerValidation,
};
