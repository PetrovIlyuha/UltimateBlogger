const sendGrigMail = require("@sendgrid/mail");
sendGrigMail.setApiKey(process.env.SENDGRIG_API_KEY);

exports.contactForm = (req, res) => {
  res.send("contact form received");
};
