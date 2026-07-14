import { pool } from "../../../db/connectoin.js";
import { updateResetOtpAndExpiryQuery } from "../../../queries/user_queries/UPDATE_USER_RESET_OTP_AND_EXPIRE_TIME.js";
const storeResetOtp = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const resetOTP = Math.floor(Math.random() * 900_000 + 100_000).toString();
    const resetExpireAt = Date.now() + 15 * 60 * 1000;

    await pool.query(updateResetOtpAndExpiryQuery, [
      resetOTP,
      resetExpireAt,
      email,
    ]);

    res.locals.resetOtp = resetOTP;
    next();
  } catch (error) {
    next(error);
  }
};

export default storeResetOtp;
