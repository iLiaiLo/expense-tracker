import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";
import AppError from "../../errorHandlers/appError.js";
const checkUserBeforeLogin = async (req, res, next) => {
  try {
    const username = res.locals.username;

    const checkUserQuery = getQuery("user_queries/FIND_USER_BY_USERNAME.sql");
    const { rowCount, rows } = await pool.query(checkUserQuery, [username]);
    const { id, is_deleted, password, is_account_verified } = rows[0];
    if (!rowCount) {
      const error = new AppError(
        `user with username ${username} not found`,
        404,
      );
      return next(error);
    }
    if (is_deleted) {
      const error = new AppError(
        `user with username ${username} is deleted`,
        403,
      );
      return next(error);
    }
    if (!is_account_verified) {
      const error = new AppError(
        `user account with username ${username} is not verified`,
        403,
      );
      return next(error);
    }

    res.locals.userId = id;
    res.locals.userPassword = password;
    next();
  } catch (error) {
    next(error);
  }
};

export default checkUserBeforeLogin;
