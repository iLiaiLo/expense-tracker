import express from "express";

import validateSignupInput from "../../middlewares/signup/validateSignupInput.js";
import checkUserBeforeSignup from "../../middlewares/signup/checkUserBeforeSignup.js";
import signup from "../../controllers/userAuthControllers/authentication/signup.js";
import sendRegistrationStatus from "../../services/sendRegistrationStatus.js";

import checkLoginFields from "../../middlewares/login/checkLoginFields.js";
import checkUserBeforeLogin from "../../middlewares/login/checkUserBeforeLogin.js";
import checkUserPassword from "../../middlewares/login/checkUserPassword.js";
import login from "../../controllers/userAuthControllers/authentication/login.js";

import logout from "../../controllers/userAuthControllers/authentication/logout.js";

import refreshToken from "../../controllers/userAuthControllers/authentication/refresh.js";

import verifyToken from "../../middlewares/verifyToken/verifyToken.js";

import accountIsVerified from "../../middlewares/vreifyOtp/accountIsVerified.js";
import storeVerifyOtp from "../../controllers/userAuthControllers/updateUserPassword/storeVerifyOtp.js";
import sendVerifyOtp from "../../services/sendVerifyOtp.js";

import checkUserOtpExpirationStatus from "../../middlewares/verifyEmail/checkUserOtpExpirationStatus.js";
import updateUserAccountVerificationStatus from "../../controllers/userAuthControllers/updateUserPassword/updateUserAccountVerificationStatus.js";
import sendUserVerificationStatus from "../../services/sendUserVerificationStatus.js";
const outhRouter = express.Router();

outhRouter.post(
  "/signup",
  validateSignupInput,
  checkUserBeforeSignup,
  signup,
  sendRegistrationStatus,
);

outhRouter.post(
  "/login",
  checkLoginFields,
  checkUserBeforeLogin,
  checkUserPassword,
  login,
);

outhRouter.post("/logout", logout);

outhRouter.post("/refresh", refreshToken);

outhRouter.post(
  "/send-verify-otp",
  verifyToken,
  accountIsVerified,
  storeVerifyOtp,
  sendVerifyOtp,
);

outhRouter.post(
  "/verify-email",
  verifyToken,
  accountIsVerified,
  checkUserOtpExpirationStatus,
  updateUserAccountVerificationStatus,
  sendUserVerificationStatus,
);

export default outhRouter;
