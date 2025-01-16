import { ChatDoc } from "@chat/interfaces/chatInterface";
import mongoose, { model, Schema } from "mongoose";

const chatSchema = new Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    ref: "Auth",
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    ref: "Auth",
  },

  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    ref: "Conversation",
  },

  receiverUsername: {
    type: String,
    required: true,
  },

  senderUsername: {
    type: String,
    required: true,
  },

  receiverProfilePhoto: {
    type: String,
    required: true,
  },
  senderProfilePhoto: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    default: "",
  },

  isRead: {
    type: Boolean,
    index: true,
    default: false,
    required: true,
  },

  hasOffer: {
    type: Boolean,
    default: false,
  },

  file: {
    type: String,
    default: "",
  },

  fileSize: {
    type: String,
    default: "",
  },

  fileType: {
    type: String,
    default: "",
  },

  fileName: {
    type: String,
    default: "",
  },

  offerGig: {
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    defaultDeliveryDate: { type: Date },
    expectedDelivery: { type: Date },
    rejected: { type: Boolean },
    accepted: { type: Boolean },
  },

  filePublicId: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ChatModel = model<ChatDoc>("Chat", chatSchema);
export { ChatModel };
