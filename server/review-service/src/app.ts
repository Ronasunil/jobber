import express, { Application, json, urlencoded } from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import { handleError, handleInvalidRoute } from "@review/errors/errorHandler";
import { config } from "@review/Config";
import { start } from "@review/server";
import { appRoutes } from "@review/routes";

const globalMiddlewares = function (app: Application) {
  app.use(compression());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ limit: "50mb", extended: true }));
};
const securityMiddlewares = function (app: Application) {
  app.use(helmet());
  app.use(hpp());
};
const routes = function (app: Application) {
  appRoutes(app);
};
const errorHandlers = function (app: Application) {
  app.all("*", handleInvalidRoute);
  app.use(handleError);
};
const corsMiddleware = function (app: Application) {
  app.use(
    cors({
      credentials: true,
      methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
      origin: config.API_GATEWAY_ENDPOINT,
    })
  );
};
const middlewares = function (app: Application) {
  corsMiddleware(app);
  globalMiddlewares(app);
  securityMiddlewares(app);
};

const initApp = async function (): Promise<Application> {
  const app = express();
  // // server
  await start(app);

  middlewares(app);
  routes(app);
  errorHandlers(app);

  return app;
};

initApp();
