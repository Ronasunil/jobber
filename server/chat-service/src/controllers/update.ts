import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import {
  markEntireChatAsRead,
  markMessageAsRead,
  updateGigOffer,
} from "@chat/services/chatService";

export const updateMessageAsRead = async function (
  req: Request,
  res: Response
) {
  const { messageId } = req.params as { messageId: string };
  const chat = await markMessageAsRead(messageId);
  res.status(httpStatus.OK).json({ message: "updated chat", chat });
};

export const updateEntireChatAsRead = async function (
  req: Request,
  res: Response
) {
  const { receiverId, senderId } = req.params as {
    senderId: string;
    receiverId: string;
  };
  await markEntireChatAsRead(senderId, receiverId);

  res.status(httpStatus.OK).json({ message: "Updated entire chat" });
};

export const acceptGigOffer = async function (req: Request, res: Response) {
  const { messageId, type } = req.params as {
    messageId: string;
    type: "accepted" | "rejected";
  };
  const chat = updateGigOffer(messageId, type);

  res.status(httpStatus.OK).json({ message: "Updated gig offer", chat });
};
