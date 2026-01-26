import express from "express";

import { getAllExpenses } from "../../controllers/expense.controllers/getRequestControllers/get.all.expenses.js";
import { getExpensesByCategory } from "../../controllers/expense.controllers/getRequestControllers/get.expense.by.category.js";
import { getExpenseById } from "../../controllers/expense.controllers/getRequestControllers/get.expense.by.id.js";

import { addExpense } from "../../controllers/expense.controllers/postRequestControllers/add.expense.js";
import { updateExpense } from "../../controllers/expense.controllers/putRequestControllers/update.expense.js";
import { deleteExpense } from "../../controllers/expense.controllers/deleteRequestControllers/delete.expense.js";
import { verifyToken } from "../../middlewares/verify.token/verifyToken.js";

const expenseRouter = express.Router();

expenseRouter.get("/", verifyToken, getAllExpenses);
expenseRouter.get("/id/:id", verifyToken, getExpenseById);
expenseRouter.get("/category/:category", verifyToken, getExpensesByCategory);

expenseRouter.post("/", verifyToken, addExpense);
expenseRouter.put("/:id", verifyToken, updateExpense);
expenseRouter.delete("/:id", verifyToken, deleteExpense);

export default expenseRouter;
