import { ConversationDoc } from "@chat/interfaces/conversationInterface";
import { ConversationModel } from "@chat/models/conversationModel";
import mongoose from "mongoose";

export const getConversations = async function (
  userId: string
): Promise<ConversationDoc[]> {
  const conversations = await ConversationModel.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  });

  return conversations;
};

export const addConversation = async function (
  conversationId: mongoose.Types.ObjectId,
  senderId: string,
  receiverId: string
) {
  await ConversationModel.create({ _id: conversationId, senderId, receiverId });
};
