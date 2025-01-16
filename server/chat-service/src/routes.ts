import { Application } from "express";
import { chatRoutes } from "./routes/chat";

export const appRoutes = function (app: Application) {
  const chatRouter = chatRoutes();
  app.use("/", chatRouter);
};
