import express from "express";
import dotenv from "dotenv";

import { connectToDb } from "./db/connectoin.js";
import cookieParser from "cookie-parser";

import outhRouter from "./routes/authRoutes/authRoutes.js";
import updatePasswordRouter from "./routes/authRoutes/updatePasswordRoutes.js";
import userRouter from "./routes/authRoutes/userRoutes.js";

import deleteAccountRouter from "./routes/authRoutes/deleteAccountRoutes.js";

import recoveryAccountRouter from "./routes/authRoutes/recoveryAccountRotues.js";

import expenseRouter from "./routes/expenseRoutes/expenseRoutes.js";

import errorHandler from "./errorHandlers/errorhandler.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user/auth", outhRouter);
app.use("/api/user/password", updatePasswordRouter);
app.use("/api/user/data", userRouter);

app.use("/api/user/account/delete", deleteAccountRouter);
app.use("/api/user/account/recovery", recoveryAccountRouter);

app.use("/api/expenses", expenseRouter);

app.use(errorHandler);

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((e) => {
    console.log(e);
  });
