import { Application } from "express";
import { healthRoutes } from "@review/routes/health";
import { reviewRoutes } from "@review/routes/review";

export const appRoutes = function (app: Application) {
  const healthRouter = healthRoutes();
  const reviewRouter = reviewRoutes();
  app.use("/", healthRouter);
  app.use("/", reviewRouter);
};
