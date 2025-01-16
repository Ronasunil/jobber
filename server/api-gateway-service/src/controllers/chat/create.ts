import { createChat } from "@gateway/services/api/chat";
import { ChatCreationAttrs, helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const chat = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const data = req.body as ChatCreationAttrs;
  const result = await createChat(data);
  return result;
});
