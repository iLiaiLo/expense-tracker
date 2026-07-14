import { pool } from "../../../db/connectoin.js";
import { updateRecoveryOtpAndExpiryQuery } from "../../../queries/user_queries/UPDATE_USER_RECOVERY_OTP_AND_EXPIRE_TIME.js";
const storeRecoveryOtp = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const recoveryOTP = Math.floor(
      Math.random() * 900_000 + 100_000,
    ).toString();
    const recoveryOTPExpireAt = Date.now() + 15 * 60 * 1000;

    await pool.query(updateRecoveryOtpAndExpiryQuery, [
      recoveryOTP,
      recoveryOTPExpireAt,
      email,
    ]);

    res.locals.recoveryOTP = recoveryOTP;
    next();
  } catch (error) {
    next(error);
  }
};

export default storeRecoveryOtp;
