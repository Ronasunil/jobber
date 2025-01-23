import { Application } from "express";
import { healthRoutes } from "@order/routes/health";
import { orderRoutes } from "@order/routes/order";

export const appRoutes = function (app: Application) {
  const healthRouter = healthRoutes();
  const orderRouter = orderRoutes();

  app.use("/", healthRouter);
  app.use("/", orderRouter);
};
