import mongoose from "mongoose";

export interface ConversationDoc extends mongoose.Document {
  senderId: mongoose.Schema.Types.ObjectId | string;
  receiverId: mongoose.Schema.Types.ObjectId | string;
}
