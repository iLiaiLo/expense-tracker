import getQuery from "../../../utils/getQuery.js";
import { pool } from "../../../db/connectoin.js";

export const getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getExpensesByCategory = getQuery(
      "expense_queries/GET_EXPENSE_BY_ID.sql"
    );
    const result = await pool.query(getExpensesByCategory, [id, req.user.id]);
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
