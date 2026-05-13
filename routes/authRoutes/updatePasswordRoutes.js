import express from "express";

import verifyUserByEmail from "../../middlewares/resetOtp/verifyUserByEmail.js";
import storeResetOtp from "../../controllers/userAuthControllers/updateUserPassword/storeResetOtp.js";
import sendResetOtp from "../../services/sendResetOtp.js";

import validateResetPasswordInput from "../../middlewares/resetPassword/validateResetPasswordInput.js";
import checkUserOtp from "../../middlewares/resetPassword/checkUserOtp.js";
import updatePassword from "../../controllers/userAuthControllers/updateUserPassword/updatePassword.js";
import sendPasswordUpdateStatus from "../../services/sendPasswordUpdateStatus.js";
const updatePasswordRouter = express.Router();

updatePasswordRouter.post(
  "/send-reset-otp",
  verifyUserByEmail,
  storeResetOtp,
  sendResetOtp,
);

updatePasswordRouter.post(
  "/update-password",
  validateResetPasswordInput,
  checkUserOtp,
  updatePassword,
  sendPasswordUpdateStatus,
);

export default updatePasswordRouter;
