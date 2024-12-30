import {
  changePassword,
  forgotPassword,
  resetPassword,
} from "@auth/controllers/password";
import {
  changePasswordSchema,
  emailSchema,
  newPasswordSchema,
} from "@auth/schemes/passwordSchema";
import { getBasePath } from "@auth/utils/helpers";
import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const passwordRoutes = function (): Router {
  const passwordRouter = Router();
  const basePath = getBasePath();

  passwordRouter.patch(
    `${basePath}/password`,
    gatewayMiddleware,
    validateJoi(changePasswordSchema),
    changePassword
  );

  passwordRouter.post(
    `${basePath}/forgot-password`,
    gatewayMiddleware,
    validateJoi(emailSchema),
    forgotPassword
  );

  passwordRouter.patch(
    `${basePath}/password/reset/:token`,
    gatewayMiddleware,
    validateJoi(newPasswordSchema),
    resetPassword
  );

  return passwordRouter;
};
