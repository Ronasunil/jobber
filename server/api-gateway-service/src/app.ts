import express, {
  Application,
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";

import compression from "compression";
import hpp from "hpp";
import helmet from "helmet";
import cookieSession from "cookie-session";
import cors from "cors";
import "express-async-errors";

import { start } from "@gateway/server";
import { handleInvalidRoute, handleError } from "@gateway/error/errorHandler";

import { config } from "@gateway/Config";
import { authAxios } from "@gateway/services/api/auth";
import { appRoutes } from "@gateway/routes";
import { buyerAxios } from "@gateway/services/api/buyer";
import { sellerAxios } from "@gateway/services/api/seller";
import { gigAxios } from "@gateway/services/api/gig";

const initApp = function (): Application {
  const app = express();

  middlewares(app);
  routes(app);
  errorHandler(app);

  // starting server
  start(app);

  return app;
};

const globalMiddlewares = function (app: Application) {
  app.use(compression());
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: config.NODE_ENV === "production",
      keys: [config.COOKIE_SECRET!],
      // sameSite: "none",
    })
  );

  app.use(passTokenMiddleware);
};

const securityMiddlewares = function (app: Application) {
  app.use(helmet());
  app.use(hpp());
};

const corsMiddleware = function (app: Application) {
  app.use(
    cors({
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
      origin: config.CLIENT_URL,
      credentials: true,
    })
  );
};

const passTokenMiddleware = function (
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (req.session?.jwt) {
    authAxios.defaults.headers["Authorization"] = `Bearer ${req.session.jwt}`;
    buyerAxios.defaults.headers["Authorization"] = `Bearer ${req.session.jwt}`;
    sellerAxios.defaults.headers["Authorization"] = `Bearer ${req.session.jwt}`;
    gigAxios.defaults.headers["Authorization"] = `Bearer ${req.session.jwt}`;
  }

  next();
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
