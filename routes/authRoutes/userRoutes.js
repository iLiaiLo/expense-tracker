import express from "express";

import verifyToken from "../../middlewares/verifyToken/verifyToken.js";

import getVerifiedUserData from "../../controllers/userAuthControllers/userInfo/getVerifiedUserData.js";

import userAuthenticatedStatus from "../../controllers/userAuthControllers/userInfo/userAuthenticatedStatus.js";
const userRouter = express.Router();

userRouter.get("/", verifyToken, getVerifiedUserData);

userRouter.post("/is-auth", verifyToken, userAuthenticatedStatus);

export default userRouter;
