import { config } from "@chat/Config";
import { ChatDoc, FileAtttrs } from "@chat/interfaces/chatInterface";
import { ChatModel } from "@chat/models/chatModel";
import { chatSocket } from "@chat/server";
import {
  BadRequest,
  ChatCreationAttrs,
  cloudinaryUploader,
  winstonLogger,
} from "@ronasunil/jobber-shared";
import mongoose, { AnyBulkWriteOperation } from "mongoose";
import { addConversation } from "@chat/services/conversationService";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Chat service",
  "info"
);

const checkMessageExists = async function (
  messageId: string
): Promise<ChatDoc | null> {
  const chat = await ChatModel.findById(messageId);
  return chat;
};

export const getChatBetweenUsers = async function (
  receiverId: string,
  senderId: string
): Promise<ChatDoc[]> {
  console.log(receiverId, senderId);
  const chats = await ChatModel.find({
    $or: [
      {
        senderId: new mongoose.Types.ObjectId(senderId),
        receiverId: new mongoose.Types.ObjectId(receiverId),
      },
      {
        senderId: new mongoose.Types.ObjectId(receiverId),
        receiverId: new mongoose.Types.ObjectId(senderId),
      },
    ],
  });

  return chats;
};

export const getChatByConversationId = async function (
  conversationId: string
): Promise<ChatDoc[]> {
  const chats = await ChatModel.find({ conversationId }).sort({
    createdAt: -1,
  });
  return chats;
};

export const markMessageAsRead = async function (
  messageId: string
): Promise<ChatDoc> {
  const messageExists = await checkMessageExists(messageId);
  if (!messageExists)
    throw new BadRequest(
      `Message with this id:${messageId} not found`,
      "markMessageAsRead(): chat service"
    );
  const updatedMessage = await ChatModel.findByIdAndUpdate(
    messageId,
    { isRead: true },
    { new: true, runValidators: true }
  );

  chatSocket.emit("message-updated", updatedMessage);
  return updatedMessage as ChatDoc;
};

export const markEntireChatAsRead = async function (
  senderId: string,
  receiverId: string
) {
  const TRIP = 10000;
  const query = {
    isRead: false,
    $or: [
      { senderId, receiverId },
      { senderId: receiverId, receiverId: senderId },
    ],
  };

  let totalChatsToUpdate = await ChatModel.countDocuments(query);

  while (totalChatsToUpdate) {
    const batchLimit = TRIP > totalChatsToUpdate ? TRIP : totalChatsToUpdate;

    const chats = await ChatModel.find(query).limit(batchLimit);

    const bulkOperation: AnyBulkWriteOperation[] = chats.map((chat) => ({
      updateOne: {
        filter: { _id: chat._id },
        update: { $set: { isRead: true } },
      },
    }));

    try {
      await ChatModel.bulkWrite(bulkOperation);
      // NOTE here we are emitting the data to be updated in client inside  by marking isRead As true
      chatSocket.emit("message-updated", chats);
      totalChatsToUpdate -= chats.length;
    } catch (err) {
      logger.info("Error updating as bulk markEntireChatAsRead");
      logger.error(err);
    }
  }
};

export const addChat = async function (
  chat: ChatCreationAttrs
): Promise<ChatDoc> {
  const { file, conversationId, senderId, receiverId } = chat;
  let fileData: FileAtttrs = {
    file: "",
    fileName: "",
    filePublicId: "",
    fileSize: "",
    fileType: "",
  };
  if (file) {
    const result = await cloudinaryUploader.uploadImage(file);
    if (!result?.public_id)
      throw new BadRequest("Error uploading file", "addChat(): chat service");

    fileData = {
      fileType: result.resource_type,
      file: result.secure_url,
      fileSize: `${result.bytes}`,
      fileName: result.original_filename,
      filePublicId: result.public_id,
    };
  }

  const convId = new mongoose.Types.ObjectId();

  if (!conversationId) await addConversation(convId, senderId, receiverId);

  const data: ChatCreationAttrs = {
    ...chat,
    ...fileData,
    conversationId: convId.toString(),
  };

  const message = await ChatModel.create(data);

  chatSocket.emit("message-added", message);

  return message;
};

export const getConversationList = async function (userId: string) {
  const conversationList = await ChatModel.aggregate([
    {
      $match: {
        $or: [
          { senderId: new mongoose.Types.ObjectId(userId) },
          { receiverId: new mongoose.Types.ObjectId(userId) },
        ],
      },
    },
    { $sort: { createdAt: -1 } },
    { $group: { _id: "$conversationId", latestChat: { $first: "$$ROOT" } } },
    {
      $project: {
        _id: 0,
        message: {
          $cond: {
            if: {
              $or: [
                { $ifNull: ["$latestChat.body", false] },
                { $eq: ["$latestChat.body", ""] },
              ],
            },
            then: "$latestChat.file",
            else: "$latestChat.body",
          },
        },
        senderProfilePhoto: "$latestChat.senderProfilePhoto",
        receiverProfilePhoto: "$latestChat.receiverProfilePhoto",
        senderUsername: "$latestChat.senderUsername",
        receiverUsername: "$latestChat.receiverUsername",
      },
    },
  ]);

  return conversationList;
};

export const destroyMessage = async function (messageId: string) {
  const messageExists = await checkMessageExists(messageId);
  if (!messageExists)
    throw new BadRequest(
      `Message including this id:${messageId} not found`,
      "deleteMessage(): chat service"
    );
  await ChatModel.findByIdAndDelete(messageId);
  chatSocket.emit("message-deleted", messageId);
};

export const updateGigOffer = async function (
  messageId: string,
  type: "rejected" | "accepted"
): Promise<ChatDoc> {
  if (type !== "rejected" && type !== "accepted")
    throw new BadRequest(`Invalid type:${type}`, "updateGigOffer chat service");

  const messageExists = await checkMessageExists(messageId);
  if (!messageExists)
    throw new BadRequest(
      `Message including this id:${messageId} not found`,
      " deleteMessage(): chat service"
    );

  const updatedMessage = await ChatModel.findByIdAndUpdate(
    messageId,
    { [`offerGig.${type}`]: true },
    { new: true, runValidators: true }
  );

  chatSocket.emit("message-updated", updatedMessage);

  return updatedMessage as ChatDoc;
};
