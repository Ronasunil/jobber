import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { markNotificationAsRead } from "@app-notification/services/notificationService";

export const notificationAsRead = async function (req: Request, res: Response) {
  const { notificationId } = req.params as { notificationId: string };
  const updatedNotification = await markNotificationAsRead(notificationId);

  res.status(httpStatus.OK).json({
    message: "Marked notification as read",
    notification: updatedNotification,
  });
};
