import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";

export const checkUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const ifEmailIsPresent = getQuery(
      "user_queries/CHECK_IF_USER_EXISTS_BY_EMAIL.sql"
    );

    const emailExists = await pool.query(ifEmailIsPresent, [email]);

    if (emailExists.rows[0].exists) {
      return res.status(400).json({
        message: `user with email ${email} has already exists`,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
