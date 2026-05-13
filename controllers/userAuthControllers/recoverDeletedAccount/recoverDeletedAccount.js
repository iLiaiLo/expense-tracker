import getQuery from "../../../utils/getQuery.js";
import { pool } from "../../../db/connectoin.js";

const recoverDeletedAccount = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const updateVerifactionQuery = getQuery(
      "user_queries/UPDATE_USER_VERIFICATION_STATUS.sql",
    );
    const updateVerifactionStatus = await pool.query(updateVerifactionQuery, [
      email,
    ]);

    res.locals.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

export default recoverDeletedAccount;
