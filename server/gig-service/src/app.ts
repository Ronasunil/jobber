import express, { Application, json, urlencoded } from "express";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import { config } from "@gig/Config";
import { start } from "@gig/server";
import { handleError, handleInvalidRoute } from "@gig/error/errorHandler";
import { appRoutes } from "./routes";

const initApp = async function () {
  const app = express();

  // server setup
  await start(app);

  middlewares(app);
  routes(app);
  errorHandler(app);
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

const corsMiddleware = function (app: Application) {
  app.use(
    cors({
      credentials: true,
      origin: config.API_GATEWAY_ENDPOINT,
      methods: ["GET", "PUT", "POST", "PATCH", "DELTE", "OPTIONS"],
    })
  );
};

const middlewares = function (app: Application) {
  corsMiddleware(app);
  securityMiddlewares(app);
  globalMiddlewares(app);
};

const routes = function (app: Application) {
  appRoutes(app);
};

const errorHandler = function (app: Application) {
  app.all("*", handleInvalidRoute);
  app.use(handleError);
};

initApp();
