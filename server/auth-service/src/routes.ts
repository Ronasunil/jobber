import { Application } from "express";
import { authRoutes } from "./routes/auth";
import { passwordRoutes } from "./routes/password";
import { healthRoutes } from "./routes/health";
import { searchRoutes } from "./routes/search";

export const appRoutes = function (app: Application) {
  const authRouter = authRoutes();
  const passwordRouter = passwordRoutes();
  const healthRouter = healthRoutes();
  const searchRouter = searchRoutes();

  app.use("/", authRouter);
  app.use("/", passwordRouter);
  app.use("/", healthRouter);
  app.use("/", searchRouter);
};
