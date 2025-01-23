export interface NotificationDoc {
  userFrom: string;
  userTo: string;
  senderUsername: string;
  receiverUsername: string;
  senderProfilePhoto: string;
  receiverProfilePhoto: string;
  message: string;
  isRead: Boolean;
  createdAt: Date;
}
