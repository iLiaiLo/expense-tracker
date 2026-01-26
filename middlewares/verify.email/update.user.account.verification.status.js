import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";

export const updateUserAccountVerificationStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updateUserIfAccauntIsVerified = getQuery(
      "user_queries/UPDATE_USER_IF_ACCAUNT_IS_VERIFIED.sql",
    );
    const updateStatus = true;
    const expireAt = 0;
    const resetOtp = "";
    await pool.query(updateUserIfAccauntIsVerified, [
      updateStatus,
      resetOtp,
      expireAt,
      userId,
    ]);

    return res
      .status(200)
      .json({ success: true, message: "email verified successfully" });
  } catch (error) {
    next(error);
  }
};
