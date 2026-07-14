import { pool } from "../../../db/connectoin.js";
import { getExpensesBycategoryQuery } from "../../../queries/expense_queries/GET_EXPENSE_BY_CATEGORY.js";

const getExpensesByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const userId = req.user.id;
    const result = await pool.query(getExpensesBycategoryQuery, [
      userId,
      category,
    ]);
    return res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};
export default getExpensesByCategory;
