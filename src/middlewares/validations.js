const validator = (schema) => async (req, res, next) => {
  const { error } = await schema(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validator;
