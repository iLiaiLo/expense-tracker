import transporter from "../utils/nodemailer.js";

const sendPasswordUpdateStatus = async (req, res, next) => {
  try {
    const email = res.locals.email;

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `for ${email}`,
      text: "Your password has been updated successfully.",
    });

    return res.status(200).json({
      message: "password updated successfully. please login",
    });
  } catch (error) {
    next(error);
  }
};

export default sendPasswordUpdateStatus;
