import getQuery from "../../../utils/getQuery.js";
import { pool } from "../../../db/connectoin.js";

export const getAllExpenses = async (req, res, next) => {
  try {
    const getAllExpenses = getQuery("expense_queries/GET_ALL_EXPENSES.sql");
    const result = await pool.query(getAllExpenses, [req.user.id]);

    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
