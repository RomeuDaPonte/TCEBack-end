const nodemailer = require('nodemailer');
const config = require('config');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.get('appMail'),
    pass: config.get('appMailPassword'),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function sendEmail(to, subject, emailBody) {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    html: emailBody,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      resolve({ info });
      reject({ error });
    });
  });
}

exports.sendEmail = sendEmail;
