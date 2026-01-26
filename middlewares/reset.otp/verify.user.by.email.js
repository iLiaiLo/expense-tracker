import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";

export const verifyUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: true, message: "please provide email" });
    }
    const findUserByEmail = getQuery("user_queries/FIND_USER_BY_EMAIL.sql");
    const user = await pool.query(findUserByEmail, [email]);
    if (!user.rowCount) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    if (!user.rows[0].is_account_verified) {
      return res
        .status(403)
        .json({ success: false, message: "user is not verified" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
