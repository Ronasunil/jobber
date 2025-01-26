import express, { Application, json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import { config } from "@order/Config";
import { start } from "@order/server";
import { appRoutes } from "@order/routes";
import { handleError, handleInvalidRoute } from "@order/errors/errorHandler";

const globalMiddlewares = function (app: Application) {
  app.use(compression());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
};

const corsMiddlewares = function (app: Application) {
  app.set("trust proxy", 1);
  app.use(
    cors({
      credentials: true,
      methods: ["GET", "PUT", "POST", "PATCH", "OPTIONS", "DELETE"],
      origin: config.API_GATEWAY_ENDPOINT,
    })
  );
};

const securityMiddlewares = function (app: Application) {
  app.use(helmet());
  app.use(hpp());
};

const middlewares = function (app: Application) {
  corsMiddlewares(app);
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

const initApp = function () {
  const app = express();
  start(app);

  middlewares(app);
  routes(app);
  errorHandler(app);
};

initApp();

process.on("SIGTERM", (sig) => {
  console.log(sig);
});
