import { userHealth } from "@user/controllers/health";
import { Router } from "express";

export const healthRoutes = function (): Router {
  const healthRouter = Router();
  healthRouter.get("/user-health", userHealth);

  return healthRouter;
};
