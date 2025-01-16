import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { addChat } from "@chat/services/chatService";
import { ChatCreationAttrs } from "@ronasunil/jobber-shared";

export const createChat = async function (req: Request, res: Response) {
  const body = req.body as ChatCreationAttrs;
  const chat = await addChat(body);

  res.status(httpStatus.OK).json({ message: "Chat added", chat });
};
