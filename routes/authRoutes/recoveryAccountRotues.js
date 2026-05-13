import express from "express";
import checkDeletedAccount from "../../middlewares/recoveryAccount/checkDeletedAccount.js";
import storeRecoveryOtp from "../../controllers/userAuthControllers/recoverDeletedAccount/storeRestorationOtp.js";
import sendRecoveryOtp from "../../services/sendREcoveryOtp.js";

import validateRecoveryAccountInput from "../../middlewares/recoveryAccount/validateRecoveryAccountInput.js";
import checkRecoveryOtp from "../../middlewares/recoveryAccount/checkRecoveryOtp.js";
import recoverDeletedAccount from "../../controllers/userAuthControllers/recoverDeletedAccount/recoverDeletedAccount.js";
import sendAccountRecoveryStatus from "../../services/sendAccountRecoveryStatus.js";

const recoveryAccountRouter = express.Router();

recoveryAccountRouter.post(
  "/send-recovery-otp",
  checkDeletedAccount,
  storeRecoveryOtp,
  sendRecoveryOtp,
);

recoveryAccountRouter.post(
  "/",
  validateRecoveryAccountInput,
  checkRecoveryOtp,
  recoverDeletedAccount,
  sendAccountRecoveryStatus,
);

export default recoveryAccountRouter;
