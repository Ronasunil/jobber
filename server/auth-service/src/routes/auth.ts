import {
  verifyMail,
  resendVerificationMail,
  signin,
  signup,
  currentUser,
} from "@auth/controllers/auth";
import { loginSchema, signupSchema } from "@auth/schemas/authSchema";
import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const authRoutes = function (): Router {
  const router = Router();
  const basePath = "/api/v1/auth";

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
