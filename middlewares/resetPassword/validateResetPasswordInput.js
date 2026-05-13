import AppError from "../../errorHandlers/appError.js";
const validateResetPasswordInput = (req, res, next) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    if (!email || !otp || !password || !confirmPassword) {
      const error = new AppError(
        "email otp password and confrirm password are required",
        400,
      );
      return next(error);
    }

    //validate email

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      const error = new AppError("please enter valid email", 400);
      return next(error);
    }

    //validate otp
    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(otp)) {
      const error = new AppError("otp must be a 6-digit number", 400);
      return next(error);
    }

    //validate password
    if (password.length < 6) {
      const error = new AppError(
        "password must be at least 6 characters long",
        400,
      );
      return next(error);
    }

    if (confirmPassword !== password) {
      const error = new AppError("passwords don't match", 400);
      return next(error);
    }
    res.locals.email = email;
    res.locals.password = password;
    res.locals.otp = otp;

    next();
  } catch (error) {
    next(error);
  }
};

export default validateResetPasswordInput;
