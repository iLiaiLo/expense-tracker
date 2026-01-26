import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";

export const checkIfAccauntIsVerified = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const findUserById = getQuery("user_queries/FIND_USER_BY_ID.sql");
    const user = await pool.query(findUserById, [userId]);

    if (user.rows[0].is_account_verified) {
      return res
        .status(403)
        .json({ success: false, message: "user has already verified" });
    }
    res.locals.userEmail = user.rows[0].email;
    next();
  } catch (error) {
    next(error);
  }
};
