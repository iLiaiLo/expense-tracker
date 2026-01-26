import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";

export const checkUserByUserName = async (req, res, next) => {
  try {
    const { username } = req.body;

    const ifUsernameIsPresent = getQuery(
      "user_queries/CHECK_IF_USER_EXISTS_BY_USERNAME.sql",
    );

    const usernameExists = await pool.query(ifUsernameIsPresent, [username]);

    if (usernameExists.rows[0].exists) {
      return res.status(400).json({
        message: `user with username ${username} has already exists`,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
