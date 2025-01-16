import { ConversationDoc } from "@chat/interfaces/conversationInterface";
import mongoose, { model, Schema } from "mongoose";

const conversationSchema = new Schema({
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
});

const ConversationModel = model<ConversationDoc>(
  "Conversation",
  conversationSchema
);

export { ConversationModel };
