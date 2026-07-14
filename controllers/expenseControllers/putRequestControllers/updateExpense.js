import { pool } from "../../../db/connectoin.js";
import AppError from "../../../errorHandlers/appError.js";
import { updateExpenseQuery } from "../../../queries/expense_queries/UPDATE_EXPENSE.js";
const updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, description, amount, color, currency } = req.body;

    const result = await pool.query(updateExpenseQuery, [
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
