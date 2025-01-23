import { NotificationDoc } from "@app-notification/interfaces/notificationInterface";
import { NotificationModel } from "@app-notification/models/notificationModel";
import { appNotificationSocket } from "@app-notification/server";
import { BadRequest, NotificationCreationAttr } from "@ronasunil/jobber-shared";

const checkNotificationExists = async function (
  notificationId: string
): Promise<NotificationDoc | null> {
  const notification = await NotificationModel.findById(notificationId);
  return notification;
};

export const createNotification = async function (
  data: NotificationCreationAttr
): Promise<NotificationDoc> {
  const { userTo } = data;
  const notification = await NotificationModel.create(data);
  appNotificationSocket.emit("notification", notification, userTo);
  return notification;
};

export const markNotificationAsRead = async function (
  notificationId: string
): Promise<NotificationDoc> {
  const notification = checkNotificationExists(notificationId);
  if (!notification)
    throw new BadRequest(
      `Notification regarding this id:${notificationId} not found`,
      "markNotificationAsRead(): App-notification service"
    );
  const updatedNotification = await NotificationModel.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true, runValidators: true }
  );

  appNotificationSocket.emit(
    "updated-notification",
    updatedNotification,
    updatedNotification!.userTo
  );

  return updatedNotification as NotificationDoc;
};

export const getUserNotification = async function (
  userId: string
): Promise<NotificationDoc[]> {
  const notifications = await NotificationModel.find({ userTo: userId });
  return notifications;
};
