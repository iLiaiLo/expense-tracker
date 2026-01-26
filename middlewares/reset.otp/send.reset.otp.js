import transporter from "../../utils/nodemailer.js";

export const sendResetOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const resetOTP = res.locals.resetOtp;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "password reset otp",
      text: `your OTP for resetting password is ${resetOTP}. use this OTP to reset your password.
      OTP will be expired in 15 minutes`,
    };
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    next(error);
  }
};
