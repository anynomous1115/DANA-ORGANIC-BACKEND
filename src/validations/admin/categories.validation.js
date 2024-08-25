const Joi = require("joi");

const categoriesValidation = (data) => {
  const categoriesSchema = Joi.object({
    categoryName: Joi.string().required(),
    description: Joi.string().required(),
  });
  return categoriesSchema.validate(data);
};

module.exports = {
  categoriesValidation,
};
