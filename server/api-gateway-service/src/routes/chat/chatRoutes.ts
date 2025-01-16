import { chat } from "@gateway/controllers/chat/create";
import {
  chatBetweenUsers,
  chatByConversationId,
  userConversation,
} from "@gateway/controllers/chat/get";
import {
  markEntireChatAsRead,
  markMessageAsRead,
  offerGig,
} from "@gateway/controllers/chat/update";
import { destroy } from "@gateway/controllers/gig/delete";
import {
  checkUserExistance,
  verifyUser,
  verifyUserInReq,
} from "@gateway/middlewares/authMiddleware";
import { Router } from "express";

export const chatRoutes = function (): Router {
  const chatRouter = Router();
  const BASE_PATH = "/api/v1/chat";

  //   GET routes
  chatRouter.get(
    `${BASE_PATH}/:senderId/:recevierId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    chatBetweenUsers
  );

  chatRouter.get(
    `${BASE_PATH}/conversation/:conversationId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    chatByConversationId
  );

  chatRouter.get(
    `${BASE_PATH}/conversation/user/:userId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    userConversation
  );

  //   POST routes
  chatRouter.post(
    `${BASE_PATH}`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    chat
  );

  //   PATCH routes
  chatRouter.patch(
    `${BASE_PATH}/:receiverId/:senderId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    markEntireChatAsRead
  );

  chatRouter.patch(
    `${BASE_PATH}/message/:messageId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    markMessageAsRead
  );

  chatRouter.patch(
    `${BASE_PATH}/:messageId/gig/:type`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    offerGig
  );

  //   DELETE routes
  chatRouter.delete(
    `${BASE_PATH}/:messageId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    destroy
  );

  return chatRouter;
};
