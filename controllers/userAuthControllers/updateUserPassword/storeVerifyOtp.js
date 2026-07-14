import { pool } from "../../../db/connectoin.js";
import { updateOtpAndExpiryQuery } from "../../../queries/user_queries/UPDATE_USER_OTP_AND_EXPIRE_TIME.js";
const storeVerifyOtp = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const OTP = Math.floor(Math.random() * 900_000 + 100_000).toString();
    const expireAt = Date.now() + 24 * 60 * 60 * 1000;

    await pool.query(updateOtpAndExpiryQuery, [OTP, expireAt, userId]);

    res.locals.otp = OTP;
    next();
  } catch (error) {
    next(error);
  }
};
export default storeVerifyOtp;
