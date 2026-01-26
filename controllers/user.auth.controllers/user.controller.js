import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";

export const getUserData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const findById = getQuery("user_queries/FIND_USER_BY_ID.sql");
    const user = await pool.query(findById, [userId]);
    if (!user.rowCount) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    return res.status(200).json({
      success: true,
      userData: {
        username: user.rows[0].username,
        email: user.rows[0].email,
        isVerified: user.rows[0].is_account_verified,
      },
    });
  } catch (error) {
    next(error);
  }
};
