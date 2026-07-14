import { pool } from "../../../db/connectoin.js";
import getQuery from "../../../utils/getQuery.js";

import { updateAccountVerificationQuery } from "../../../queries/user_queries/UPDATE_USER_IF_ACCAUNT_IS_VERIFIED.js";
const updateUserAccountVerificationStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await pool.query(updateAccountVerificationQuery, [userId]);

    next();
  } catch (error) {
    next(error);
  }
};

export default updateUserAccountVerificationStatus;
