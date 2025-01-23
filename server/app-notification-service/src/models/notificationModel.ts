import { NotificationDoc } from "@app-notification/interfaces/notificationInterface";
import mongoose, { model, Schema } from "mongoose";

const notificationSchema = new Schema({
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    ref: "Buyer",
  },

  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    ref: "Buyer",
  },

  senderUsername: {
    type: String,
    required: true,
    index: true,
  },

  receiverUsername: {
    type: String,
    required: true,
    index: true,
  },

  senderProfilePhoto: {
    type: String,
    required: true,
  },
  receiverProfilePhoto: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  isRead: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const NotificationModel = model<NotificationDoc>(
  "Notification",
  notificationSchema
);

export { NotificationModel };
