const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with the email service you're using
    auth: {
      user: "teamaxios12@gmail.com", // Your email
      pass: "wwws vftz vmmi uluw", // Your password or app-specific password
    },
  });
  
  router.post("/send-email", (req, res) => {
    const { name, email, username, password } = req.body;
  
    const mailOptions = {
      from: "teamaxios12@gmail.com",
      to: email,
      subject: "Your Credentials",
      html: `<h3>Hello ${name},</h3>
             <p>Here are your credentials:</p>
             <p><b>Username:</b> ${username}</p>
             <p><b>Company Code:</b> ${password}</p>
             <p>Thank you!</p>`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      } else {
        return res.status(200).json({ message: "Email sent successfully" });
      }
    });
  });

module.exports = router;
