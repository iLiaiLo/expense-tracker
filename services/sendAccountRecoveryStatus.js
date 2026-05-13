import transporter from "../utils/nodemailer.js";
const sendAccountRecoveryStatus = async (req, res, next) => {
  try {
    const email = res.locals.email;
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `for ${email}`,
      text: "Your account has been recovered successfully",
    });
    return res.status(200).json({ message: "account recovered successfully" });
  } catch (error) {
    next(error);
  }
};

export default sendAccountRecoveryStatus;
