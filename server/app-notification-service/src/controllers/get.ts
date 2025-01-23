import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { getUserNotification } from "@app-notification/services/notificationService";

export const userNotifications = async function (req: Request, res: Response) {
  const { userId } = req.params as { userId: string };
  const userNotifications = await getUserNotification(userId);

  res
    .status(httpStatus.OK)
    .json({ message: "User notifications", notifications: userNotifications });
};
