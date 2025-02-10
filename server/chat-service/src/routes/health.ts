import { chatHealth } from "@chat/controllers/health";
import { Router } from "express";

export const healthRoute = function (): Router {
  const healthRouter = Router();
  healthRouter.get("/chat-health", chatHealth);

  return healthRouter;
};
