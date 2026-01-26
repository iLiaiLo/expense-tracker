import transporter from "../../utils/nodemailer.js";

export const sendEmail = async (req, _, next) => {
  try {
    const { username, email } = req.body;

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "for new user",
      text: `hello ${username} you have been registered successfully`,
    });
    next();
  } catch (error) {
    next(error);
  }
};
