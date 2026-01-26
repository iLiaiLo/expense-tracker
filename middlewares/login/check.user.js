import { pool } from "../../db/connectoin.js";
import getQuery from "../../utils/getQuery.js";

export const checkUser = async (req, res, next) => {
  try {
    const { username } = req.body;

    const checkUserQuery = getQuery("user_queries/FIND_USER.sql");
    const user = await pool.query(checkUserQuery, [username]);
    if (!user.rowCount) {
      return res
        .status(404)
        .json({ message: `user with username ${username} was not found` });
    }

    res.locals.userId = user.rows[0].id;
    res.locals.userPassword = user.rows[0].password;
    next();
  } catch (error) {
    next(error);
  }
};
