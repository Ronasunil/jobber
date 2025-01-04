import { Application, Router } from "express";
import { healthRoutes } from "@user/routes/health";
import { buyerRoutes } from "@user/routes/buyer";
import { sellerRoutes } from "@user/routes/seller";

export const userRoutes = function (app: Application) {
  const buyerRouter = buyerRoutes();
  const sellerRouter = sellerRoutes();
  const healthRouter = healthRoutes();

  app.use("/", buyerRouter);
  app.use("/", sellerRouter);
  app.use("/", healthRouter);
};
