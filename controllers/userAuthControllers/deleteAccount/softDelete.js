import { pool } from "../../../db/connectoin.js";
import AppError from "../../../errorHandlers/appError.js";
import { softDeleteQuery } from "../../../queries/user_queries/SOFT_DELETE.js";
const softDelete = async (req, res, next) => {
  try {
    const id = req.user.id;
    const deleteAccount = await pool.query(softDelete, [id]);
    if (!deleteAccount.rowCount) {
      const error = new AppError("unable to perform soft delete", 404);
      return next(error);
    }

    const { email } = deleteAccount.rows[0];

    res.locals.deletedAccountEmail = email;

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

export default softDelete;
