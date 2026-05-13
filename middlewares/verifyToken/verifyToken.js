import jwt from "jsonwebtoken";
import AppError from "../../errorHandlers/appError.js";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(404).json({ message: "no token for authentication" });
    }
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        const error = new AppError(err.message, 403);
        return next(error);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
