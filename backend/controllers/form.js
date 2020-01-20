const sendGrigMail = require("@sendgrid/mail");
sendGrigMail.setApiKey(process.env.SENDGRIG_API_KEY);

exports.contactForm = (req, res) => {
  const { email, name, message } = req.body;
  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: `Contact form - ${process.env.APP_NAME}`,
    text: `Email recieved from contact form \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
      <h4>Email received from contact form:</h4>
      <p>Sender name: ${name}</p>
      <p>Sender email: ${email}</p>
      <p>Sender message: ${message}</p>
      <hr/>
      <p>This email may contain sensitive information</p>
      <p>https://ultimate-blogs.com</p>
    `
  };

  sendGrigMail.send(emailData).then(sent => {
    return res.json({
      success: true
    });
  });
};