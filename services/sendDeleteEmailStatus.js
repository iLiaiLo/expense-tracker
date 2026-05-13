import transporter from "../utils/nodemailer.js";

const sendDeleteEmailStatus = async (req, res, next) => {
  try {
    const email = res.locals.deletedAccountEmail;

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `for ${email}`,
      text: "Your account has been deleted.",
    });
    return res.status(200).json({
      message: "Your account has been deleted.",
    });
  } catch (error) {
    next(error);
  }
};

export default sendDeleteEmailStatus;
