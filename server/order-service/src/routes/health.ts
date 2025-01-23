import { health } from "@order/controllers/health";
import { Router } from "express";

export const healthRoutes = function (): Router {
  const healthRouter = Router();

  healthRouter.get("/order-health", health);

  return healthRouter;
};
