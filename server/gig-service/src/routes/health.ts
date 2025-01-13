import { health } from "@gig/controllers/health";
import { Router } from "express";

export const healthRoutes = function (): Router {
  const healthRouter = Router();
  healthRouter.get("/gig-health", health);
  return healthRouter;
};
