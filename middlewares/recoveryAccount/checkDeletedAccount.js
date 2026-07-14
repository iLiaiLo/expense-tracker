import { pool } from "../../db/connectoin.js";
import AppError from "../../errorHandlers/appError.js";

import { findUserByEmailQuery } from "../../queries/user_queries/FIND_USER_BY_EMAIL.js";
const checkDeletedAccount = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new AppError("please provide email", 400);
      return next(error);
    }
    const user = await pool.query(findUserByEmailQuery, [email]);
    if (!user.rowCount) {
      const error = new AppError("user not found", 404);
      return next(error);
    }

    if (user.rows[0].is_account_verified) {
      const error = new AppError("user already verified.", 403);
      return next(error);
    }

    res.locals.email = email;

    next();
  } catch (error) {
    next(error);
  }
};

export default checkDeletedAccount;
