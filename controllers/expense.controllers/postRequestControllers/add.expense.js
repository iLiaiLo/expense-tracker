import { pool } from "../../../db/connectoin.js";
import getQuery from "../../../utils/getQuery.js";

export const addExpense = async (req, res, next) => {
  try {
    const { category, description, amount, color, currency } = req.body;
    const id = crypto.randomUUID();
    const addExpense = getQuery("expense_queries/ADD_EXPENSE.sql");
    const result = await pool.query(addExpense, [
      id,
      req.user.id,
      category,
      description,
      amount,
      color,
      currency,
    ]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
