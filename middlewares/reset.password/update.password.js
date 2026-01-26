import getQuery from "../../utils/getQuery.js";
import { pool } from "../../db/connectoin.js";

import bcrypt from "bcrypt";

export const updatePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const resetPasswordQuery = getQuery(
      "user_queries/UPDATE_USER_PASSWORD.sql",
    );

    const resetOtp = "";
    const resetOtpExpireAt = 0;

    await pool.query(resetPasswordQuery, [
      hashedPassword,
      resetOtp,
      resetOtpExpireAt,
      email,
    ]);

    return res
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "password updated successfully. please login",
      });
  } catch (error) {
    next(error);
  }
};
