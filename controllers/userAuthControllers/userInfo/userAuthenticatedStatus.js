import getQuery from "../../../utils/getQuery.js";
import { pool } from "../../../db/connectoin.js";

const userAuthenticatedStatus = async (req, res, next) => {
  try {
    const id = req.user.id;
    const userQuery = getQuery("user_queries/FIND_USER_BY_ID.sql");
    const user = await pool.query(userQuery, [id]);
    if (!user.rows[0].is_account_verified) {
      const error = new AppError("user is not verified to access data", 403);
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "user has been successfully authenticated",
    });
  } catch (error) {
    next(error);
  }
};
export default userAuthenticatedStatus;
