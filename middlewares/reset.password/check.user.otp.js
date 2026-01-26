import getQuery from "../../utils/getQuery.js";
import { pool } from "../../db/connectoin.js";

export const checkUserOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const findUserByemail = getQuery("user_queries/FIND_USER_BY_EMAIL.sql");
    const user = await pool.query(findUserByemail, [email]);
    if (!user.rowCount) {
      return res.status(404).json({
        success: false,
        message: `user with email ${email} was not found`,
      });
    }

    if (!user.rows[0].is_account_verified) {
      return res
        .status(403)
        .json({ success: false, message: "user is not verified" });
    }

    if (!user.rows[0].reset_otp || user.rows[0].reset_otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "otp is not matched to corresponding user's otp",
      });
    }

    if (user.rows[0].reset_otp_expire_at < Date.now()) {
      return res.status(410).json({ success: false, message: "otp expired" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
