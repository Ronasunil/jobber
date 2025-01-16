import { config } from "@gateway/Config";
import { axiosInstance } from "../axios";
import { AxiosResponse } from "axios";
import { ChatCreationAttrs } from "@ronasunil/jobber-shared";

export const chatAxios = axiosInstance(
  `${config.CHAT_SERVICE_URL}/api/v1/chat`
);

export const getChatBetweenUsers = async function (
  senderId: string,
  receiverId: string
): Promise<AxiosResponse> {
  const result = await chatAxios.get(`/${senderId}/${receiverId}`);
  return result;
};

export const getChatByConversationId = async function (
  conversationId: string
): Promise<AxiosResponse> {
  const result = await chatAxios.get(`/conversation/${conversationId}`);
  return result;
};

export const getUserConversation = async function (
  userId: string
): Promise<AxiosResponse> {
  const result = chatAxios.get(`/conversation/user/${userId}`);
  return result;
};

export const createChat = async function (
  body: ChatCreationAttrs
): Promise<AxiosResponse> {
  console.log("lpppp");
  const result = await chatAxios.post("", body);
  console.log(result);
  return result;
};

export const updateEntireChatAsRead = async function (
  senderId: string,
  receiverId: string
): Promise<AxiosResponse> {
  const result = await chatAxios(`/${receiverId}/${senderId}`);
  return result;
};

export const updateMessageAsRead = async function (
  messageId: String
): Promise<AxiosResponse> {
  const result = await chatAxios(`/message/${messageId}`);
  return result;
};

export const updateGigOffer = async function (
  messageId: string,
  type: string
): Promise<AxiosResponse> {
  const result = await chatAxios(`/${messageId}/gig/${type}`);
  return result;
};

export const deleteMessage = async function (
  messageId: string
): Promise<AxiosResponse> {
  const result = await chatAxios(`/${messageId}`);
  return result;
};
