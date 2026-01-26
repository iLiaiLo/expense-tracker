export const validateOtp = (req, res, next) => {
  try {
    const { otp } = req.body;
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
      return res
        .status(400)
        .json({ success: false, message: "otp must be a 6-digit number" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
