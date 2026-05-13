import transporter from "../utils/nodemailer.js";

const sendUserVerificationStatus = async (req, res, next) => {
  const email = res.locals.userEmail;
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `for ${email}`,
      text: "your account verified successfully.",
    });
    return res.status(200).json({ message: "account verified successfully" });
  } catch (error) {
    next(error);
  }
};
export default sendUserVerificationStatus;
