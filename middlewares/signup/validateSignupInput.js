import AppError from "../../errorHandlers/appError.js";
const validateSignupInput = (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      const error = new AppError(
        "username email and password fields are required",
        400,
      );
      return next(error);
    }

    //validate username

    const usernameRegex = /^(?=.+[A-Za-z]).{3,}$/;

    if (!usernameRegex.test(username)) {
      const error = new AppError(
        "username should contain at least three letters",
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

    res.locals.username = username;
    res.locals.email = email;
    res.locals.password = password;

    next();
  } catch (error) {
    next(error);
  }
};

export default validateSignupInput;
