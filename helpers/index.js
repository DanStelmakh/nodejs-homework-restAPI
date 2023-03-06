const { handleErrors } = require("./handleSchemaError");
const { sendMail } = require("./sendgrid");

module.exports = {
  handleErrors,
  sendMail,
};
