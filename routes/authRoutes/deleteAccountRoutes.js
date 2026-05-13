import express from "express";

import verifyToken from "../../middlewares/verifyToken/verifyToken.js";
import verifyUser from "../../middlewares/verification/verifyUser.js";
import softDelete from "../../controllers/userAuthControllers/deleteAccount/softDelete.js";
import sendDeleteEmailStatus from "../../services/sendDeleteEmailStatus.js";

const deleteAccountRouter = express.Router();

deleteAccountRouter.delete(
  "/soft-delete",
  verifyToken,
  verifyUser,
  softDelete,
  sendDeleteEmailStatus,
);

export default deleteAccountRouter;
