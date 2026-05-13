import getQuery from "../../../utils/getQuery.js";
import { pool } from "../../../db/connectoin.js";

const storeRecoveryOtp = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const recoveryOTP = Math.floor(
      Math.random() * 900_000 + 100_000,
    ).toString();
    const recoveryOTPExpireAt = Date.now() + 15 * 60 * 1000;

    const updateExpirationData = getQuery(
      "user_queries/UPDATE_USER_RECOVERY_OTP_AND_EXPIRE_TIME.sql",
    );

    await pool.query(updateExpirationData, [
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
