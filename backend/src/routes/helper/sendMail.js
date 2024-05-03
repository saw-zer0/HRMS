const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

async function sendMail() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: {
        name: "HRMS",
        address: process.env.SENDER_EMAIL,
      }, // sender address
      to: "np03cs4a220052@heraldcollege.edu.np", // list of receivers
      subject: "Hope", // Subject line
      text: "Hope you had a woderful day", // plain text body
      html: "<b>Wonderful day ain't it</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

module.exports = sendMail;