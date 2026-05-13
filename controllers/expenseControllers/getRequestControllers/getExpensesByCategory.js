import { pool } from "../../../db/connectoin.js";
import getQuery from "../../../utils/getQuery.js";

const getExpensesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const userId = req.user.id;

    const getExpensesByCategory = getQuery(
      "expense_queries/GET_EXPENSE_BY_CATEGORY.sql",
    );
    const result = await pool.query(getExpensesByCategory, [userId, category]);
    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
export default getExpensesByCategory;
