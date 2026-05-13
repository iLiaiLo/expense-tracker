import bcrypt from "bcrypt";
import AppError from "../../errorHandlers/appError.js";
const checkUserPassword = async (req, res, next) => {
  try {
    const password = res.locals.password;
    const userPassword = res.locals.userPassword;
    const passwordsAreMatched = await bcrypt.compare(password, userPassword);
    if (!passwordsAreMatched) {
      const error = new AppError("passwords are not matched", 401);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkUserPassword;
