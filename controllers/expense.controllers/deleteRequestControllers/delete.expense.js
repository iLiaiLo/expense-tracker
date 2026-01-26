import { pool } from "../../../db/connectoin.js";
import getQuery from "../../../utils/getQuery.js";

export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteExpense = getQuery("expense_queries/DELETE_EXPENSE.sql");
    const result = await pool.query(deleteExpense, [id, req.user.id]);
    if (!result.rowCount) {
      return res
        .status(404)
        .json({ message: `expense with id ${id} was not found` });
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
