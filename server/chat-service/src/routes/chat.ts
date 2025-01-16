import { createChat } from "@chat/controllers/create";
import { deleteMessage } from "@chat/controllers/delete";
import {
  chatBetweenUsers,
  chatByConversationId,
  conversationList,
} from "@chat/controllers/get";
import {
  acceptGigOffer,
  updateEntireChatAsRead,
  updateMessageAsRead,
} from "@chat/controllers/update";
import { chatSchema } from "@chat/schemas/chatSchema";
import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const chatRoutes = function (): Router {
  const chatRouter = Router();
  const basePath = "/api/v1/chat";

  //   GET routes
  chatRouter.get(
    `${basePath}/:senderId/:receiverId`,
    gatewayMiddleware,
    chatBetweenUsers
  );

  chatRouter.get(
    `${basePath}/conversation/:conversationId`,
    gatewayMiddleware,
    chatByConversationId
  );

  chatRouter.get(
    `${basePath}/conversation/user/:userId`,
    gatewayMiddleware,
    conversationList
  );

  //   POST routes
  chatRouter.post(
    `${basePath}`,
    gatewayMiddleware,
    validateJoi(chatSchema),
    createChat
  );

  //   PATCH routes
  chatRouter.patch(
    `${basePath}/:receiverId/:senderId`,
    gatewayMiddleware,
    updateEntireChatAsRead
  );

  chatRouter.patch(
    `${basePath}/message/:messageId`,
    gatewayMiddleware,
    updateMessageAsRead
  );

  chatRouter.patch(
    `${basePath}/:messageId/gig/:type`,
    gatewayMiddleware,
    acceptGigOffer
  );

  //   DELETE routes
  chatRouter.delete(`${basePath}/:messageId`, gatewayMiddleware, deleteMessage);

  return chatRouter;
};
