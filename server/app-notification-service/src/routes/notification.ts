import { create } from "@app-notification/controllers/create";
import { userNotifications } from "@app-notification/controllers/get";
import { notificationAsRead } from "@app-notification/controllers/update";
import { notifcationSchema } from "@app-notification/schemas/notificationSchema";
import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const notifcationRoutes = function (): Router {
  const notificationRouter = Router();
  const basePath = "api/v1/notifications";

  notificationRouter.post(
    `${basePath}`,
    gatewayMiddleware,
    validateJoi(notifcationSchema),
    create
  );
  notificationRouter.get(
    `${basePath}/:userId`,
    gatewayMiddleware,
    userNotifications
  );

  notificationRouter.patch(
    `${basePath}/:notificationId`,
    gatewayMiddleware,
    notificationAsRead
  );

  return notificationRouter;
};
