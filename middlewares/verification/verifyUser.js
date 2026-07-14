import { findUserByIdQuery } from "../../queries/user_queries/FIND_USER_BY_ID.js";
import { pool } from "../../db/connectoin.js";
import AppError from "../../errorHandlers/appError.js";

const verifyUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await pool.query(findUserByIdQuery, [id]);
    if (!user.rows[0].is_account_verified) {
      const error = new AppError("user is not verified to access data", 403);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default verifyUser;
