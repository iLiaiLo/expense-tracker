import { pool } from "../../../db/connectoin.js";
import { addExpenseQuery } from "../../../queries/expense_queries/ADD_EXPENSE.js";
const addExpense = async (req, res, next) => {
  try {
    const { category, description, amount, color, currency } = req.body;
    const id = crypto.randomUUID();
    const userId = req.user.id;
    const result = await pool.query(addExpenseQuery, [
      id,
      userId,
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

export default addExpense;
