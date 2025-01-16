import express, { Application, json, urlencoded } from "express";
import cors from "cors";
import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";

import { config } from "@chat/Config";
import { handleInvalidRoute, handleError } from "@chat/error/errorHandler";
import { appRoutes } from "@chat/routes";
import { start } from "@chat/server";

const corsMiddleware = function (app: Application) {
  app.use(
    cors({
      credentials: true,
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      origin: config.API_GATEWAY_ENDPOINT,
    })
  );
};

const globalMiddlewares = function (app: Application) {
  app.use(compression());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ limit: "50mb", extended: true }));
};

const securityMiddlewares = function (app: Application) {
  app.use(helmet());
  app.use(hpp());
};

const middlewares = function (app: Application) {
  corsMiddleware(app);
  globalMiddlewares(app);
  securityMiddlewares(app);
};

const routes = function (app: Application) {
  appRoutes(app);
};

const errorHandler = function (app: Application) {
  app.all("*", handleInvalidRoute);
  app.use(handleError);
};

const initApp = function () {
  const app = express();

  start(app);

  middlewares(app);
  routes(app);
  errorHandler(app);
};

initApp();
