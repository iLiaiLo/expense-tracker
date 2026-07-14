import { pool } from "../../../db/connectoin.js";
import { getExpenseByIdQuery } from "../../../queries/expense_queries/GET_EXPENSE_BY_ID.js";
const getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(getExpenseByIdQuery, [id, req.user.id]);
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

export default getExpenseById;
