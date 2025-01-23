import express, { Application, json, urlencoded } from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";

import { config } from "@user/Config";
import { handleInvalidRoute, handleError } from "@user/errors/errorHandler";
import { start } from "@user/server";
import { userRoutes } from "@user/routes";

const initApp = function () {
  const app = express();

  start(app);

  middlewares(app);
  routes(app);
  errorHandler(app);
};

const securityMiddlewares = function (app: Application) {
  app.use(helmet());
  app.use(hpp());
};

const globalMiddlewares = function (app: Application) {
  app.use(compression());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
};

const corsMiddleware = function (app: Application) {
  app.use(
    cors({
      credentials: true,
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      origin: config.API_GATEWAY_ENDPOINT,
    })
  );
};

const middlewares = function (app: Application) {
  corsMiddleware(app);
  globalMiddlewares(app);
  securityMiddlewares(app);
};

const routes = function (app: Application) {
  userRoutes(app);
};

const errorHandler = function (app: Application) {
  app.all("*", handleInvalidRoute);
  app.use(handleError);
};

initApp();
