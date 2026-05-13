import transporter from "../utils/nodemailer.js";

const sendRegistrationStatus = async (req, res, next) => {
  try {
    const username = res.locals.username;
    const email = res.locals.email;
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `for ${email}`,
      text: `hello ${username} you have been registered successfully`,
    });

    return res
      .status(201)
      .json({ message: "user created successfully and logged in" });
  } catch (error) {
    next(error);
  }
};

export default sendRegistrationStatus;
