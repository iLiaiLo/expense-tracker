import transporter from "../utils/nodemailer.js";

const sendDeleteEmailStatus = async (req, res, next) => {
  try {
    const email = res.locals.deletedAccountEmail;

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `for ${email}`,
      text: "Your account has been deleted. you can recover it in 30 days or it will be deleted permanently.",
    });
    return res.status(200).json({
      message:
        "Your account has been deleted. you can recover it in 30 days or it will be deleted permanently.",
    });
  } catch (error) {
    next(error);
  }
};

export default sendDeleteEmailStatus;
