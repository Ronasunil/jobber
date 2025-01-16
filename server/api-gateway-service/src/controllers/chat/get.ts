import {
  getChatBetweenUsers,
  getChatByConversationId,
  getUserConversation,
} from "@gateway/services/api/chat";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const chatBetweenUsers = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { senderId, recevierId } = req.params as {
    senderId: string;
    recevierId: string;
  };

  const result = await getChatBetweenUsers(senderId, recevierId);
  return result;
});

export const chatByConversationId = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { conversationId } = req.params as {
    conversationId: string;
  };
  const result = await getChatByConversationId(conversationId);
  return result;
});

export const userConversation = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { userId } = req.params as {
    userId: string;
  };
  const result = await getUserConversation(userId);
  return result;
});
