import { getUserNotifications } from "@gateway/services/api/appNotification";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const userNotifications = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { userId } = req.params as { userId: string };

  const result = await getUserNotifications(userId);
  return result;
});
