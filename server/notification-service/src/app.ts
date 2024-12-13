import express, { Application } from "express";
import { start } from "./server";
import { notficationRoutes } from "@notifications/routes/route";

export const initApp = function (): void {
  const app = express();
  start(app);
  routes(app);
};

const routes = function (app: Application) {
  notficationRoutes(app);
};

initApp();
