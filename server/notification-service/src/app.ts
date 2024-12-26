import express, { Application } from "express";
import { start } from "./server";
import { notficationRoutes } from "@notifications/routes/route";

export const initApp = function (): Application {
  const app = express();
  start(app);
  routes(app);

  return app;
};

const routes = function (app: Application) {
  notficationRoutes(app);
};

initApp();
