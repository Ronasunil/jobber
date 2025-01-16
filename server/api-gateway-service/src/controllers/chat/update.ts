import {
  updateEntireChatAsRead,
  updateGigOffer,
  updateMessageAsRead,
} from "@gateway/services/api/chat";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const markEntireChatAsRead = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { senderId, recevierId } = req.params as {
    senderId: string;
    recevierId: string;
  };
  const result = await updateEntireChatAsRead(senderId, recevierId);
  return result;
});

export const markMessageAsRead = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { messageId } = req.params as {
    messageId: string;
  };
  const result = await updateMessageAsRead(messageId);
  return result;
});

export const offerGig = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { messageId, type } = req.params as {
    messageId: string;
    type: string;
  };
  const result = await updateGigOffer(messageId, type);
  return result;
});
