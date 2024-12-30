import express, { Application } from "express";
import { start } from "@notifications/server";
import { notificationRoutes } from "@notifications/routes/route";

export const initApp = function (): Application {
  const app = express();
  start(app);
  routes(app);
  return app;
};

const routes = function (app: Application) {
  notificationRoutes(app);
};

initApp();
