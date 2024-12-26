import {
  changePasswordGateway,
  forgotPasswordGateway,
  resetPasswordGateway,
} from "@gateway/controllers/auth/password";
import {
  checkUserExistance,
  verifyUser,
  verifyUserInReq,
} from "@gateway/middlewares/authMiddleware";
import { Router } from "express";

export const passwordRoutes = function (): Router {
  const router = Router();
  const BASE_PATH = "/api/v1/auth";

  router.patch(
    `${BASE_PATH}/password`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    changePasswordGateway
  );
  router.patch(`${BASE_PATH}/password/reset/:token`, resetPasswordGateway);

  router.post(`${BASE_PATH}/forgot-password`, forgotPasswordGateway);

  return router;
};
