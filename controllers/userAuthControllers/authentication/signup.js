import bcrypt from "bcrypt";
import { pool } from "../../../db/connectoin.js";
import jwt from "jsonwebtoken";
import { addUserQuery } from "../../../queries/user_queries/ADD_USER.js";

const signup = async (req, res, next) => {
  try {
    const id = crypto.randomUUID();
    const username = res.locals.username;
    const password = res.locals.password;
    const email = res.locals.email;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(addUserQuery, [id, username, email, hashedPassword]);

    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_KEY, {
      expiresIn: "1d",
    });
    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_KEY, {
      expiresIn: "15m",
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

    next();
  } catch (error) {
    next(error);
  }
};

export default signup;
