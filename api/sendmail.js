require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

const host = process.env.MAIL_HOST;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const to = process.env.MAIL_TO;

const transporter = nodemailer.createTransport({
  port: 465,
  host,
  auth: {
    user,
    pass,
  },
  // upgrades later with STARTTLS -- change this based on the PORT
  secure: true,
});

router.post("/", (req, res) => {
  const { message, name, email } = req.body;
  const mailData = {
    from: email,
    to,
    subject: `New message from ${name} - ${email}`,
    text: message,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({
      message: "Mail send",
      status: 200,
      message_id: info.messageId,
    });
  });
});

module.exports = router;
