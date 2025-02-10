import express, { Application, json, urlencoded } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import "express-async-errors";

import { config } from "@auth/Config";
import { handleError, handleInvalidRoute } from "@auth/error/errorHandler";
import { appRoutes } from "@auth/routes";
import { start } from "@auth/server";

const initApp = async function (): Promise<Application> {
  const app = express();

  middlewares(app);
  routes(app);
  errorHandler(app);

  start(app);

  return app;
};

const globalMiddleware = function (app: Application) {
  app.use(compression());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
};

const securityMiddleware = function (app: Application) {
  app.use(helmet());
  app.use(hpp());
};

const corsMiddleware = function (app: Application) {
  app.use(
    cors({
      origin: config.API_GATEWAY_ENDPOINT,
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );
};

const middlewares = function (app: Application) {
  app.set("trust proxy", true);
  corsMiddleware(app);
  securityMiddleware(app);
  globalMiddleware(app);
};

const routes = function (app: Application) {
  appRoutes(app);
};

const errorHandler = function (app: Application) {
  app.all("*", handleInvalidRoute);
  app.use(handleError);
};

initApp();
