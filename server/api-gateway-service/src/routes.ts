import { Application } from "express";
import { healthRoute } from "@gateway/routes/health";
import { authRoutes } from "@gateway/routes/auth/auth";
import { passwordRoutes } from "@gateway/routes/auth/password";
import { searchRoutes } from "./routes/auth/search";

export const appRoutes = function (app: Application) {
  const healthRouter = healthRoute();
  const authRouter = authRoutes();
  const passwordRouter = passwordRoutes();
  const searchRouter = searchRoutes();

  app.use("/", healthRouter);
  app.use("/gateway", authRouter);
  app.use("/gateway", passwordRouter);
  app.use("/gateway", searchRouter);
};
