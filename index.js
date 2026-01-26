import express from "express";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenseRoutes/expenseRoutes.js";
import outhRouter from "./routes/authRoutes/authRoutes.js";

import { connectToDb } from "./db/connectoin.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./errorHandlers/error.handler.js";
import userRouter from "./routes/authRoutes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", outhRouter);
app.use("/api/data", userRouter);
app.use("/api/expenses", expenseRouter);

app.use(errorHandler);

connectToDb()
  .then(() => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((e) => {
    console.log(e);
  });
