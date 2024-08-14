const Joi = require("joi");

const { password } = require("./custom.validation");

const registerValidation = (data) => {
  const registerSchema = Joi.object().keys({
    fullname: Joi.string().allow(null),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().custom(password),
    rePassword: Joi.string().required().valid(Joi.ref("password")),
    phone: Joi.string().allow(null, ""),
    Dob: Joi.date().required(),
  });
  return registerSchema.validate(data);
};

const loginValidation = (data) => { 
  const loginSchema = Joi.object().keys({
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required(),
  });
  return loginSchema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
