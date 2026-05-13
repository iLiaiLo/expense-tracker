import { pool } from "../../db/connectoin.js";
import AppError from "../../errorHandlers/appError.js";
import getQuery from "../../utils/getQuery.js";
const checkUserBeforeSignup = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const userStatusQuery = getQuery("user_queries/FIND_USER_BY_EMAIL.sql");
    const { rows, rowCount } = await pool.query(userStatusQuery, [email]);

    const user = rows[0];

    if (rowCount && !user.is_deleted) {
      const error = new AppError("user with this email already exists", 409);
      return next(error);
    }

    if (rowCount && user.is_deleted) {
      const error = new AppError(
        "this account has been deleted. try to sing up using deifferent account or recover it.",
        409,
      );
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkUserBeforeSignup;
