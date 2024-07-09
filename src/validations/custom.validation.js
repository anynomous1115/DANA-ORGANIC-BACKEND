const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("Password must be at least 8 characters long");
  }

  if (!value.match(/[a-zA-Z]/)) {
    return helpers.message("Password must contain at least 1 letter");
  }

  if (!value.match(/\d/)) {
    return helpers.message("Password must contain at least 1 number");
  }

  if (!value.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    return helpers.message(
      "Password must contain at least 1 special character"
    );
  }

  return value;
};

module.exports = {
  objectId,
  password,
};
