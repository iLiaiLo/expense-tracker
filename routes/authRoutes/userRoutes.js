import express from "express";

import { getUserData } from "../../controllers/user.auth.controllers/user.controller.js";
import { verifyToken } from "../../middlewares/verify.token/verifyToken.js";
const userRouter = express.Router();

userRouter.get("/", verifyToken, getUserData);

export default userRouter;
