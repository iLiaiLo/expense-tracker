import bcrypt from "bcrypt";
import getQuery from "../../utils/getQuery.js";
import { pool } from "../../db/connectoin.js";
import jwt from "jsonwebtoken";

export const generateTokenAfterSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const id = crypto.randomUUID();

    const hashedPassword = await bcrypt.hash(password, 10);
    const addUser = getQuery("user_queries/ADD_USER.sql");
    await pool.query(addUser, [id, username, email, hashedPassword]);

    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "user created successfully and logged in" });
  } catch (error) {
    next(error);
  }
};
