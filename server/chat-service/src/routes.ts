import { Application } from "express";
import { chatRoutes } from "@chat/routes/chat";
import { healthRoute } from "@chat/routes/health";

export const appRoutes = function (app: Application) {
  const chatRouter = chatRoutes();
  const healthRouter = healthRoute();
  app.use("/", healthRouter);
  app.use("/", chatRouter);
};
