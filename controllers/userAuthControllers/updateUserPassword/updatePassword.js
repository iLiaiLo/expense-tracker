import getQuery from "../../../utils/getQuery.js";
import { pool } from "../../../db/connectoin.js";

import bcrypt from "bcrypt";

const updatePassword = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const password = res.locals.password;

    const hashedPassword = await bcrypt.hash(password, 10);

    const resetPasswordQuery = getQuery(
      "user_queries/UPDATE_USER_PASSWORD.sql",
    );

    await pool.query(resetPasswordQuery, [hashedPassword, email]);

    const options = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };

    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options);

    next();
  } catch (error) {
    next(error);
  }
};

export default updatePassword;
