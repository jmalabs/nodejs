const sgMail = require("@sendgrid/mail");

const emailConfig = require("../../config/email.config");

sgMail.setApiKey(emailConfig.sgAPIKey);

sgMail.send({
  to: "pinedameg@gmail.com",
  from: "pinedameg@gmail.com",
  subject: "This is my first creation!",
  text: "I hope this one actually get to you!",
});
