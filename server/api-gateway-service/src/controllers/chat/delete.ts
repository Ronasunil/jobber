import { deleteMessage } from "@gateway/services/api/chat";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const destroy = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { messageId } = req.params as { messageId: string };
  const result = await deleteMessage(messageId);
  return result;
});
