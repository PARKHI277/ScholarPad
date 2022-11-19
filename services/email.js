const nodemailer = require("nodemailer");
require("dotenv").config();
const emailer = function emailer(to, text, subject) {
  //function to send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("OTP sent: " + info.response);
    }
  });
};

module.exports = emailer;
