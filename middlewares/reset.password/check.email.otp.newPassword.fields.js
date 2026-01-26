export const checkEmailOtpNewPasswordfields = (req, res, next) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    if (!email || !otp || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "email otp password and confrirm password are required",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
