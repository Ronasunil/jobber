import { health } from "@review/controllers/health";
import { Router } from "express";

export const healthRoutes = function (): Router {
  const healthRouter = Router();
  healthRouter.get("/review-health", health);

  return healthRouter;
};
