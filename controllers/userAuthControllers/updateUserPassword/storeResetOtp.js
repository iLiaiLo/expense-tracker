import { pool } from "../../../db/connectoin.js";
import getQuery from "../../../utils/getQuery.js";

const storeResetOtp = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const resetOTP = Math.floor(Math.random() * 900_000 + 100_000).toString();
    const resetExpireAt = Date.now() + 15 * 60 * 1000;

    const updateExpirationData = getQuery(
      "user_queries/UPDATE_USER_RESET_OTP_AND_EXPIRE_TIME.sql",
    );

    await pool.query(updateExpirationData, [resetOTP, resetExpireAt, email]);

    res.locals.resetOtp = resetOTP;
    next();
  } catch (error) {
    next(error);
  }
};

export default storeResetOtp;
