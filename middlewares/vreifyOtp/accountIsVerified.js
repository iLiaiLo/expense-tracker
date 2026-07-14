import { pool } from "../../db/connectoin.js";
import { findUserByIdQuery } from "../../queries/user_queries/FIND_USER_BY_ID.js";
import AppError from "../../errorHandlers/appError.js";
const accountIsVerified = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await pool.query(findUserByIdQuery, [userId]);
    const { is_account_verified, email } = user.rows[0];

    if (is_account_verified) {
      const error = new AppError("user has already verified", 403);
      return next(error);
    }
    res.locals.userEmail = email;
    next();
  } catch (error) {
    next(error);
  }
};
export default accountIsVerified;
