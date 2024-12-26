import express, { Application, json, urlencoded } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import "express-async-errors";

import { config } from "@auth/Config";
import { handleError } from "@auth/error/errorHandler";
import { appRoutes } from "@auth/routes";
import { start } from "@auth/server";

const initApp = function (): Application {
  const app = express();

  middlewares(app);
  routes(app);
  errorHandler(app);

  start(app);

  return app;
};

const globalMiddleware = function (app: Application) {
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));
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
  corsMiddleware(app);
  securityMiddleware(app);
  globalMiddleware(app);
};

const routes = function (app: Application) {
  appRoutes(app);
};

const errorHandler = function (app: Application) {
  app.use(handleError);
};

initApp();
