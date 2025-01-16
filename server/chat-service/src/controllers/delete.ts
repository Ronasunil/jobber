import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { destroyMessage } from "@chat/services/chatService";

export const deleteMessage = async function (req: Request, res: Response) {
  const { messageId } = req.params as { messageId: string };
  await destroyMessage(messageId);

  res.status(httpStatus.NO_CONTENT).json({});
};
