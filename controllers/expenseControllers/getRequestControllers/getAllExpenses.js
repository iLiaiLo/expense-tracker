import { pool } from "../../../db/connectoin.js";
import { getAllExpensesQuery } from "../../../queries/expense_queries/GET_ALL_EXPENSES.js";
const getAllExpenses = async (req, res, next) => {
  try {
    const result = await pool.query(getAllExpensesQuery, [req.user.id]);

    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
export default getAllExpenses;
