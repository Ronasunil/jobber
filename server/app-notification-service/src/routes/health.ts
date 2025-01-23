import { health } from "@app-notification/controllers/health";
import { Router } from "express";

export const healthRoutes = function (): Router {
  const healthRouter = Router();

  healthRouter.get("/app-notification-health", health);

  return healthRouter;
};
