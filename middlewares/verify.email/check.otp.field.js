export const checkOtpField = (req, res, next) => {
  try {
    const { otp } = req.body;

    const userId = req.user.id;

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: `user not found with id ${userId}` });
    }

    if (!otp) {
      return res.status(400).json({ message: "please enter OTP field" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
