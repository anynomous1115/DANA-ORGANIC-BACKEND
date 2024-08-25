const Joi = require("joi");
const { objectId } = require("../custom.validation");

const productsValidation = (data) => {
  const productsSchema = Joi.object({
    productName: Joi.string().required(),
    origin: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    categoryId: Joi.string().required(),
    sold: Joi.number().required(),
  });
  return productsSchema.validate(data);
};

module.exports = {
  productsValidation,
};
