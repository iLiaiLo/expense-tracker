import AppError from "../../errorHandlers/appError.js";
const validateRecoveryAccountInput = (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      const error = new AppError("please enter valid email", 400);
      return next(error);
    }

    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
      const error = new AppError("otp must be a 6-digit number", 400);
      return next(error);
    }

    res.locals.recoveryOTP = otp;
    res.locals.email = email;

    next();
  } catch (error) {
    next(error);
  }
};

export default validateRecoveryAccountInput;
