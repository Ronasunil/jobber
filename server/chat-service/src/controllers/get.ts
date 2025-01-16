import { Response, Request } from "express";
import httpStatus from "http-status-codes";

import {
  getChatBetweenUsers,
  getChatByConversationId,
  getConversationList,
} from "@chat/services/chatService";

export const chatBetweenUsers = async function (req: Request, res: Response) {
  const { receiverId, senderId } = req.params as {
    senderId: string;
    receiverId: string;
  };
  const chats = await getChatBetweenUsers(receiverId, senderId);

  res.status(httpStatus.OK).json({ message: "Users chats", chats });
};

export const conversationList = async function (req: Request, res: Response) {
  const { userId } = req.params as { userId: string };
  const conversations = await getConversationList(userId);

  res.status(httpStatus.OK).json({ message: "Conversations", conversations });
};

export const chatByConversationId = async function (
  req: Request,
  res: Response
) {
  const { conversationId } = req.params as { conversationId: string };
  const conversations = await getChatByConversationId(conversationId);

  res.status(httpStatus.OK).json({ message: "Conversations", conversations });
};
