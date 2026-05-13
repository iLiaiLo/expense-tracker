import { pool } from "../../../db/connectoin.js";
import AppError from "../../../errorHandlers/appError.js";
import getQuery from "../../../utils/getQuery.js";

const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, description, amount, color, currency } = req.body;
    const updateExpense = getQuery("expense_queries/UPDATE_EXPENSE.sql");

    const result = await pool.query(updateExpense, [
      id,
      req.user.id,
      category,
      description,
      amount,
      color,
      currency,
    ]);

    if (!result.rowCount) {
      const error = new AppError(`unable to update expense with id ${id}`, 404);
      return next(error);
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
export default updateExpense;
