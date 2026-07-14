import { pool } from "../../db/connectoin.js";
import { findUserByIdQuery } from "../../queries/user_queries/FIND_USER_BY_ID.js";
import AppError from "../../errorHandlers/appError.js";
const checkUserOtpExpirationStatus = async (req, res, next) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      const error = new AppError("please enter OTP field", 400);
      return next(error);
    }

    const userId = req.user.id;

    const user = await pool.query(findUserByIdQuery, [userId]);
    if (!user) {
      const error = new AppError(
        "user not found during email verification",
        404,
      );
      return next(error);
    }
    const { verify_otp, verify_otp_expire_at } = user.rows[0];

    if (!verify_otp || verify_otp !== otp) {
      const error = new AppError("invalid OTP", 400);
      return next(error);
    }

    if (verify_otp_expire_at < Date.now()) {
      const error = new AppError("OTP expired", 410);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkUserOtpExpirationStatus;
