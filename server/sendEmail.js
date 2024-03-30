const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "elysium.253@gmail.com",
    pass: "gcrtrubzbofhruzy",
  },
});

const mailOptions = {
  from: "elysium.253@gmail.com",
  to: "kushagra.1794@gmail.com",
  subject: "Hello from Nodemailer",
  text: "This is a test email sent using Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email: ", error);
  } else {
    console.log("Email sent: ", info.response);
  }
});
