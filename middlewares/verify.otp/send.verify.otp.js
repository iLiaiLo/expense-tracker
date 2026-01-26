import transporter from "../../utils/nodemailer.js";

export const sendVerifyOtp = async (_, res, next) => {
  try {
    const OTP = res.locals.otp;
    const email = res.locals.userEmail;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "for new user",
      text: `yout OTP is ${OTP}. Verify accaunt using this OTP`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      sucess: true,
      message: "Verification OTP was sent user's email",
    });
  } catch (error) {
    next(error);
  }
};
