const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENGRID_API_KEY } = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: "danila19.08.92@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw new Error();
  }
};

module.exports = { sendMail };

// const mail = {
//   to: "danila@gmail.com",
//   from: "danila19.08.92@gmail.com",
//   subject: "New user",
//   html: "<p>New user has signed up</p>",
// };
