import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

export default transporter;

// host: "smtp.gmail.com",
//   port: 465, // Use 465 for SSL or 587 for TLS
//   secure: true,
