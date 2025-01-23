import { Request, Response } from "express";

import { createNotification } from "@gateway/services/api/appNotification";
import { helpers, NotificationCreationAttr } from "@ronasunil/jobber-shared";

export const create = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const body = req.body as unknown as NotificationCreationAttr;
  const result = await createNotification(body);
  return result;
});
