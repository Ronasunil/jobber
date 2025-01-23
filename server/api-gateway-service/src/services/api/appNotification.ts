import { config } from "@gateway/Config";
import { axiosInstance } from "@gateway/services/axios";
import { NotificationCreationAttr } from "@ronasunil/jobber-shared";
import { AxiosResponse } from "axios";

export const appNotificationAxios = axiosInstance(
  `${config.APP_NOTIFICATION_SERVICE_URL}/api/v1/notifications`
);

export const getUserNotifications = async function (
  userId: string
): Promise<AxiosResponse> {
  const result = await appNotificationAxios.get(`/${userId}`);
  return result;
};

export const createNotification = async function (
  data: NotificationCreationAttr
): Promise<AxiosResponse> {
  const result = await appNotificationAxios.post("/", data);
  return result;
};

export const markNotificationAsRead = async function (
  id: string
): Promise<AxiosResponse> {
  const result = await appNotificationAxios.patch(`/${id}`);
  return result;
};
