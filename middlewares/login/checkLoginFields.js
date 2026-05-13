import AppError from "../../errorHandlers/appError.js";
const checkLoginFields = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const error = new AppError("please fill all fields", 400);
      return next(error);
    }

    res.locals.username = username;
    res.locals.password = password;

    next();
  } catch (error) {
    next(error);
  }
};
export default checkLoginFields;
