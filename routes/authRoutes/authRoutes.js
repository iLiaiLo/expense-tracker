import express from "express";

import { checkSignupFields } from "../../middlewares/signup/check.signup.fields.js";
import { checkUserByUserName } from "../../middlewares/signup/check.user.by.username.js";
import { checkUserByEmail } from "../../middlewares/signup/check.user.by.email.js";
import { validateUsername } from "../../middlewares/validation/validate.username.js";
import { validateEmail } from "../../middlewares/validation/validate.email.js";
import { validatePassword } from "../../middlewares/validation/validate.password.js";
import { generateTokenAfterSignup } from "../../middlewares/signup/generate.token.after.signup.js";
import { checkLoginFields } from "../../middlewares/login/check.login.fields.js";
import { checkUser } from "../../middlewares/login/check.user.js";
import { checkUserPassword } from "../../middlewares/login/check.user.password.js";
import { generateTokenAfterLogin } from "../../middlewares/login/generate.token.after.login.js";
import { sendEmail } from "../../middlewares/signup/send.email.js";
import { verifyToken } from "../../middlewares/verify.token/verifyToken.js";
import { ifUserIsAuthenticated } from "../../controllers/user.auth.controllers/if.user.is.authenticated.js";
import { checkEmailOtpNewPasswordfields } from "../../middlewares/reset.password/check.email.otp.newPassword.fields.js";
import { validateOtp } from "../../middlewares/validation/validate.otp.js";
import { checkUserOtp } from "../../middlewares/reset.password/check.user.otp.js";
import { updatePassword } from "../../middlewares/reset.password/update.password.js";
import { logout } from "../../middlewares/logout/logout.js";
import { checkIfAccauntIsVerified } from "../../middlewares/verify.otp/check.if.accaunt.is.verified.js";
import { storeVerifyOtp } from "../../middlewares/verify.otp/store.verify.otp.js";
import { sendVerifyOtp } from "../../middlewares/verify.otp/send.verify.otp.js";

import { verifyUserByEmail } from "../../middlewares/reset.otp/verify.user.by.email.js";
import { storeResetOtp } from "../../middlewares/reset.otp/store.reset.otp.js";
import { sendResetOtp } from "../../middlewares/reset.otp/send.reset.otp.js";
import { checkOtpField } from "../../middlewares/verify.email/check.otp.field.js";
import { checkUserOtpExpirationStatus } from "../../middlewares/verify.email/check.user.otp.expiration.status.js";
import { updateUserAccountVerificationStatus } from "../../middlewares/verify.email/update.user.account.verification.status.js";

const outhRouter = express.Router();

outhRouter.post(
  "/signup",
  checkSignupFields,
  checkUserByUserName,
  checkUserByEmail,
  validateUsername,
  validateEmail,
  validatePassword,
  sendEmail,
  generateTokenAfterSignup,
);
outhRouter.post(
  "/login",
  checkLoginFields,
  checkUser,
  checkUserPassword,
  generateTokenAfterLogin,
);

outhRouter.post("/logout", logout);

outhRouter.post(
  "/send-verify-otp",
  verifyToken,
  checkIfAccauntIsVerified,
  storeVerifyOtp,
  sendVerifyOtp,
);
outhRouter.post(
  "/verify-email",
  verifyToken,
  checkOtpField,
  checkUserOtpExpirationStatus,
  updateUserAccountVerificationStatus,
);
outhRouter.post("/is-auth", verifyToken, ifUserIsAuthenticated);
outhRouter.post(
  "/send-reset-otp",
  verifyUserByEmail,
  storeResetOtp,
  sendResetOtp,
);
outhRouter.post(
  "/reset-password",
  checkEmailOtpNewPasswordfields,
  validateEmail,
  validateOtp,
  validatePassword,
  checkUserOtp,
  updatePassword,
);

export default outhRouter;
