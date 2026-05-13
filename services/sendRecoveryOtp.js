import transporter from "../utils/nodemailer.js";

const sendRecoveryOtp = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const recoveryOTP = res.locals.recoveryOTP;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "recovery otp",
      text: `your OTP for recovering account is ${recoveryOTP} use this OTP to restore your account.
      OTP will be expired in 15 minutes`,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "recovery OTP sent to your email" });
  } catch (error) {
    next(error);
  }
};

export default sendRecoveryOtp;
