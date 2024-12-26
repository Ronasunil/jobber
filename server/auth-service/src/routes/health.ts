import { authHealth } from "@auth/controllers/health";
import { Router } from "express";

export const healthRoutes = function (): Router {
  const healthRouter = Router();

  healthRouter.get("/auth-health", authHealth);

  return healthRouter;
};
