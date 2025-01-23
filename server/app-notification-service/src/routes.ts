import { Application } from "express";
import { healthRoutes } from "@app-notification/routes/health";
import { notifcationRoutes } from "./routes/notification";

export const appRoutes = function (app: Application) {
  const healthRouter = healthRoutes();
  const notifcationRouter = notifcationRoutes();

  app.use("/", healthRouter);
  app.use("/", notifcationRouter);
};
