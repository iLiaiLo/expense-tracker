import { pool } from "../../../db/connectoin.js";
import getQuery from "../../../utils/getQuery.js";

export const updateExpense = async (req, res, next) => {
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
      return res
        .status(404)
        .json({ message: `unable to update expense with id ${id}` });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
