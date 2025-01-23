import { Application } from "express";
import { healthRoute } from "@gateway/routes/health";
import { authRoutes } from "@gateway/routes/auth/auth";
import { passwordRoutes } from "@gateway/routes/auth/password";
import { searchRoutes } from "@gateway/routes/auth/search";
import { buyerRoutes } from "@gateway/routes/user/buyer";
import { sellerRoutes } from "@gateway/routes/user/seller";
import { commandRoutes } from "@gateway/routes/gig/commandRoutes";
import { queriesRoutes } from "@gateway/routes/gig/queriesRoutes";
import { chatRoutes } from "@gateway/routes/chat/chatRoutes";
import { appNotifcationRoutes } from "@gateway/routes/app-notification/app-notification";
import { orderRoutes } from "@gateway/routes/order/order";

export const appRoutes = function (app: Application) {
  const healthRouter = healthRoute();
  const authRouter = authRoutes();
  const passwordRouter = passwordRoutes();
  const searchRouter = searchRoutes();
  const buyerRouter = buyerRoutes();
  const sellerRouter = sellerRoutes();
  const gigsCommandRouter = commandRoutes();
  const gigsQueriesROuter = queriesRoutes();
  const chatRouter = chatRoutes();
  const appNotifcationRouter = appNotifcationRoutes();
  const orderRouter = orderRoutes();

  app.use("/", healthRouter);
  app.use("/gateway", authRouter);
  app.use("/gateway", passwordRouter);
  app.use("/gateway", searchRouter);
  app.use("/gateway", buyerRouter);
  app.use("/gateway", sellerRouter);
  app.use("/gateway", gigsCommandRouter);
  app.use("/gateway", gigsQueriesROuter);
  app.use("/gateway", chatRouter);
  app.use("/gateway", appNotifcationRouter);
  app.use("/gateway", orderRouter);
};
