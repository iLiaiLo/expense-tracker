import { pool } from "../../../db/connectoin.js";
import AppError from "../../../errorHandlers/appError.js";
import getQuery from "../../../utils/getQuery.js";

const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteExpense = getQuery("expense_queries/DELETE_EXPENSE.sql");
    const result = await pool.query(deleteExpense, [id, req.user.id]);
    if (!result.rowCount) {
      const error = new AppError(`expense with id ${id} was not found`, 404);
      return next(error);
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
export default deleteExpense;
