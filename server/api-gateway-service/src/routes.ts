import { Application } from "express";
import { healthRoute } from "@gateway/routes/health";
import { authRoutes } from "@gateway/routes/auth/auth";
import { passwordRoutes } from "@gateway/routes/auth/password";
import { searchRoutes } from "./routes/auth/search";
import { buyerRoutes } from "./routes/user/buyer";
import { sellerRoutes } from "./routes/user/seller";

export const appRoutes = function (app: Application) {
  const healthRouter = healthRoute();
  const authRouter = authRoutes();
  const passwordRouter = passwordRoutes();
  const searchRouter = searchRoutes();
  const buyerRouter = buyerRoutes();
  const sellerRouter = sellerRoutes();

  app.use("/", healthRouter);
  app.use("/gateway", authRouter);
  app.use("/gateway", passwordRouter);
  app.use("/gateway", searchRouter);
  app.use("/gateway", buyerRouter);
  app.use("/gateway", sellerRouter);
};
