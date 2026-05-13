import AppError from "../../errorHandlers/appError.js";

const checkOtpField = (req, res, next) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      const error = new AppError("please enter OTP field", 400);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default checkOtpField;
