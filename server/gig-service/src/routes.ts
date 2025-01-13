import { Application } from "express";
import { commandRoutes } from "@gig/routes/commandRoutes";
import { queriesRoutes } from "./routes/queriesRoutes";
import { healthRoutes } from "./routes/health";

export const appRoutes = function (app: Application) {
  const commandRouter = commandRoutes();
  const queriesRouter = queriesRoutes();
  const healthRouter = healthRoutes();
  app.use("/", commandRouter);
  app.use("/", queriesRouter);
  app.use("/", healthRouter);
};
