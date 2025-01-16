import mongoose from "mongoose";

export interface ChatDoc extends mongoose.Document {
  receiverId: string | mongoose.Schema.Types.ObjectId;
  senderId: string | mongoose.Schema.Types.ObjectId;
  conversationId: string | mongoose.Schema.Types.ObjectId;
  receiverUsername: string;
  senderUsername: string;
  receiverProfilePhoto: string;
  senderProfilePhoto: string;
  body: string;
  isRead: Boolean;
  hasOffer: Boolean;
  file: string;
  fileSize: string;
  fileType: string;
  fileName: string;
  filePublicId: string;

  offerGig: {
    title: string;
    price: number;
    description: string;
    defaultDeliveryDate: Date;
    expectedDelivery: Date;
    rejected: Boolean;
    accepted: Boolean;
  };

  createdAt: Date;
}

export interface ConversationList {
  senderProfilePhoto: string;
  receiverProfilePhoto: string;
  senderUsername: string;
  receiverUsername: string;
  lastMessage: string;
}

export interface FileAtttrs {
  fileType: string;
  file: string;
  fileSize: string;
  fileName: string;
  filePublicId: string;
}
