import { pool } from "../../../db/connectoin.js";
import getQuery from "../../../utils/getQuery.js";
const updateUserAccountVerificationStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updateUserIfAccauntIsVerified = getQuery(
      "user_queries/UPDATE_USER_IF_ACCAUNT_IS_VERIFIED.sql",
    );
    await pool.query(updateUserIfAccauntIsVerified, [userId]);

    next();
  } catch (error) {
    next(error);
  }
};

export default updateUserAccountVerificationStatus;
