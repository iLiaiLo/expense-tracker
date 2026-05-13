import { pool } from "../../../db/connectoin.js";
import AppError from "../../../errorHandlers/appError.js";
import getQuery from "../../../utils/getQuery.js";

const getVerifiedUserData = async (req, res, next) => {
  try {
    const id = req.user.id;
    const userQuery = getQuery("user_queries/FIND_USER_BY_ID.sql");
    const user = await pool.query(userQuery, [id]);
    const { email, is_account_verified, username } = user.rows[0];
    if (!is_account_verified) {
      const error = new AppError("user is not verified to access data", 403);
      return next(error);
    }

    return res.status(200).json({
      success: true,
      userData: {
        username,
        email,
        isVerified: is_account_verified,
      },
    });
  } catch (error) {
    next(error);
  }
};
export default getVerifiedUserData;
