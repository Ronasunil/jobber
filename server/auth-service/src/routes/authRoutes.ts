import {
  verifyMail,
  resendVerificationMail,
  signin,
  signup,
  currentUser,
} from "@auth/controllers/auth";
import { loginSchema, signupSchema } from "@auth/schemes/authSchema";
import { getBasePath } from "@auth/utils/helpers";
import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const authRoutes = function (): Router {
  const router = Router();
  const basePath = getBasePath();

  router.post(
    `${basePath}/signup`,
    gatewayMiddleware,
    validateJoi(signupSchema),
    signup
  );

  router.post(
    `${basePath}/signin`,
    gatewayMiddleware,
    validateJoi(loginSchema),
    signin
  );

  router.patch(`${basePath}/verify`, gatewayMiddleware, verifyMail);

  router.get(
    `${basePath}/email/verification`,
    gatewayMiddleware,
    resendVerificationMail
  );

  router.get(
    `${basePath}/current-user/:userId`,
    gatewayMiddleware,
    currentUser
  );

  return router;
};
