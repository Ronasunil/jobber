import {
  currentUserGateway,
  resendVerificationMailGateway,
  signInGateway,
  signupGateway,
  verifyMailGateway,
} from "@gateway/controllers/auth/auth";

import {
  checkUserExistance,
  verifyUser,
  verifyUserInReq,
} from "@gateway/middlewares/authMiddleware";
import { Router } from "express";

export const authRoutes = function (): Router {
  const router = Router();
  const BASE_PATH = "/api/v1/auth";

  router.post(`${BASE_PATH}/signup`, signupGateway);
  router.post(`${BASE_PATH}/signin`, signInGateway);
  router.patch(`${BASE_PATH}/verify`, verifyMailGateway);
  router.get(`${BASE_PATH}/email/verification`, resendVerificationMailGateway);
  router.get(
    `${BASE_PATH}/current-user`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    currentUserGateway
  );
  return router;
};
