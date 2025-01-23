import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { createNotification } from "@app-notification/services/notificationService";
import { NotificationCreationAttr } from "@ronasunil/jobber-shared";

export const create = async function (req: Request, res: Response) {
  const body = req.body as NotificationCreationAttr;
  const notification = await createNotification(body);

  res.status(httpStatus.OK).json({ message: "Notification", notification });
};
