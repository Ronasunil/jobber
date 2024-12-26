import { Application, Request, Response } from "express";
import statusCode from "http-status-codes";

export const notficationRoutes = function (app: Application) {
  app.get("/notification-health", (_req: Request, res: Response) => {
    res
      .status(statusCode.OK)
      .json({ message: "Notification service is healthy" });
  });
};
