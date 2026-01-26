import { pool } from "../../../db/connectoin.js";
import getQuery from "../../../utils/getQuery.js";

export const getExpensesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const getExpensesByCategory = getQuery(
      "expense_queries/GET_EXPENSE_BY_CATEGORY.sql",
    );
    const result = await pool.query(getExpensesByCategory, [
      req.user.id,
      category,
    ]);
    // if (!result.rowCount) {
    //   return res
    //     .status(404)
    //     .json({ message: `expense with category ${category} was not found` });
    // }
    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
