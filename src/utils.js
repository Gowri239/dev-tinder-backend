const validator = require("validator");

const validationSchema = (data) => {
  const { firstName, emailId, age } = data;
  if (!firstName || firstName.length > 6) {
    throw new Error("Please enter valid name");
  }

  if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Invalid Email");
  }

  if (!age || age < 18) {
    throw new Error("Invalid Age");
  }
};

module.exports = validationSchema;
