import getQuery from "../../utils/getQuery.js";
import { pool } from "../../db/connectoin.js";
import AppError from "../../errorHandlers/appError.js";
const checkRecoveryOtp = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const otp = res.locals.recoveryOTP;
    const findUserByemail = getQuery("user_queries/FIND_USER_BY_EMAIL.sql");
    const user = await pool.query(findUserByemail, [email]);
    if (!user.rowCount) {
      const error = new AppError(`user with email ${email} was not found`, 404);
      return next(error);
    }
    const { is_account_verified, recovery_otp, recovery_otp_expire_at } =
      user.rows[0];

    if (is_account_verified) {
      const error = new AppError("user is already verified", 403);
      return next(error);
    }

    if (!recovery_otp || recovery_otp !== otp) {
      const error = new AppError(
        "otp is not present or is not matched to corresponding user's recovery otp",
        400,
      );
      return next(error);
    }

    if (recovery_otp_expire_at < Date.now()) {
      const error = new AppError("restore otp expired", 410);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkRecoveryOtp;
