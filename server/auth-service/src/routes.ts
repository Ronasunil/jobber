import { Application } from "express";
import { authRoutes } from "./routes/authRoutes";
import { passwordRoutes } from "./routes/passwordRoutes";
import { healthRoutes } from "./routes/health";

export const appRoutes = function (app: Application) {
  const authRouter = authRoutes();
  const passwordRouter = passwordRoutes();
  const healthRouter = healthRoutes();

  app.use("/", authRouter);
  app.use("/", passwordRouter);
  app.use("/", healthRouter);
};
