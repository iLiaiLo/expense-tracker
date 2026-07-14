import { pool } from "../../../db/connectoin.js";
import { updateVerificationQuery } from "../../../queries/user_queries/UPDATE_USER_VERIFICATION_STATUS.js";

const recoverDeletedAccount = async (req, res, next) => {
  try {
    const email = res.locals.email;
    const updateVerifactionStatus = await pool.query(updateVerificationQuery, [
      email,
    ]);

    res.locals.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

export default recoverDeletedAccount;
