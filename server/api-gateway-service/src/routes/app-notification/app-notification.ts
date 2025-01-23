import { create } from "@gateway/controllers/notification/create";
import { userNotifications } from "@gateway/controllers/notification/get";
import { notificationAsRead } from "@gateway/controllers/notification/update";
import {
  verifyUser,
  verifyUserInReq,
} from "@gateway/middlewares/authMiddleware";

import { Router } from "express";

export const appNotifcationRoutes = function (): Router {
  const notificationRouter = Router();
  const BASE_PATH = "api/v1/notifications";

  notificationRouter.post(`${BASE_PATH}`, verifyUserInReq, verifyUser, create);
  notificationRouter.get(
    `${BASE_PATH}/:userId`,
    verifyUserInReq,
    verifyUser,
    userNotifications
  );

  notificationRouter.patch(
    `${BASE_PATH}/:notificationId`,
    verifyUserInReq,
    verifyUser,
    notificationAsRead
  );

  return notificationRouter;
};
