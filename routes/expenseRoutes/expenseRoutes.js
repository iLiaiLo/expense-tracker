import express from "express";

import getAllExpenses from "../../controllers/expenseControllers/getRequestControllers/getAllExpenses.js";
import getExpensesByCategory from "../../controllers/expenseControllers/getRequestControllers/getExpensesByCategory.js";
import getExpenseById from "../../controllers/expenseControllers/getRequestControllers/getExpenseByid.js";

import addExpense from "../../controllers/expenseControllers/postRequestControllers/addExpense.js";
import updateExpense from "../../controllers/expenseControllers/putRequestControllers/updateExpense.js";
import deleteExpense from "../../controllers/expenseControllers/deleteRequestControllers/deleteExpense.js";

import verifyToken from "../../middlewares/verifyToken/verifyToken.js";
import verifyUser from "../../middlewares/verification/verifyUser.js";

const expenseRouter = express.Router();

expenseRouter.get("/", verifyToken, verifyUser, getAllExpenses);
expenseRouter.get("/id/:id", verifyToken, verifyUser, getExpenseById);
expenseRouter.get(
  "/category/:category",
  verifyToken,
  verifyUser,
  getExpensesByCategory,
);

expenseRouter.post("/", verifyToken, verifyUser, addExpense);
expenseRouter.put("/:id", verifyToken, verifyUser, updateExpense);
expenseRouter.delete("/:id", verifyToken, verifyUser, deleteExpense);

export default expenseRouter;
