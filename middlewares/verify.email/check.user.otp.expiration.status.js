import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";

export const checkUserOtpExpirationStatus = async (req, res, next) => {
  try {
    const { otp } = req.body;

    const userId = req.user.id;
    const findUserById = getQuery("user_queries/FIND_USER_BY_ID.sql");

    const user = await pool.query(findUserById, [userId]);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found during email verification",
      });
    }

    if (!user.rows[0].verify_otp || user.rows[0].verify_otp !== otp) {
      return res.status(400).json({ success: false, message: "invalid otp" });
    }

    if (user.rows[0].verify_otp_expire_at < Date.now()) {
      return res.status(410).json({ success: false, message: "OTP exipred" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
