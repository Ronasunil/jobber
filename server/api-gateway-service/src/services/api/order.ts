import { AxiosResponse } from "axios";
import { axiosInstance } from "../axios";
import {
  ExtensionRequest,
  OfferRequest,
  OrderCreationAttr,
} from "@ronasunil/jobber-shared";

export const orderAxios = axiosInstance(`api/v1/orders`);

export const getOrderById = async function (
  orderId: string
): Promise<AxiosResponse> {
  const result = await orderAxios.get(`/${orderId}`);
  return result;
};

export const getSellerAcceptedOrders = async function (
  sellerId: string
): Promise<AxiosResponse> {
  const result = await orderAxios.get(`/sellers/${sellerId}`);
  return result;
};

export const getBuyerOrders = async function (
  buyerId: string
): Promise<AxiosResponse> {
  const result = await orderAxios.get(`/buyers/${buyerId}`);
  return result;
};

export const createOrders = async function (
  data: OrderCreationAttr
): Promise<AxiosResponse> {
  const result = await orderAxios.post("/", data);
  return result;
};

export const createIntent = async function (
  email: string
): Promise<AxiosResponse> {
  const result = await orderAxios.post(`/intent`, { email });
  return result;
};

export const cancelOrder = async function (
  orderId: string
): Promise<AxiosResponse> {
  const result = await orderAxios.patch(`/${orderId}/cancel`);
  return result;
};

export const deliveryExtensionReq = async function (
  orderId: string,
  data: ExtensionRequest
): Promise<AxiosResponse> {
  const result = await orderAxios.patch(`/${orderId}/delivery-extension`, data);
  return result;
};

export const deliveryExtensionStatus = async function (
  orderId: string,
  data: {
    accepted: boolean;
    rejected: boolean;
  }
): Promise<AxiosResponse> {
  const result = await orderAxios.patch(`/${orderId}/approval`, data);
  return result;
};

export const offerGig = async function (
  orderId: string,
  data: OfferRequest
): Promise<AxiosResponse> {
  const result = await orderAxios.patch(`/${orderId}/offer`, data);
  return result;
};

export const deliverOrder = async function (
  orderId: string,
  file: string
): Promise<AxiosResponse> {
  const result = await orderAxios.patch(`/${orderId}/deliver`, { file });
  return result;
};
