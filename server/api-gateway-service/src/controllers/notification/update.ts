import { markNotificationAsRead } from "@gateway/services/api/appNotification";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const notificationAsRead = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { notificationId } = req.params as { notificationId: string };

  const result = await markNotificationAsRead(notificationId);
  return result;
});
