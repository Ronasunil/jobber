import { AxiosResponse } from "axios";
import { axiosInstance } from "../axios";
import {
  SellerCreationAttrs,
  SellerUpdateAttrs,
} from "@ronasunil/jobber-shared";
import { config } from "@gateway/Config";

export const sellerAxios = axiosInstance(
  `${config.USER_SERVICE_URL}/api/v1/seller`
);

export const createSeller = async function (
  data: SellerCreationAttrs
): Promise<AxiosResponse> {
  const result = await sellerAxios.post(`/`, data);
  return result;
};

export const updateSeller = async function (
  sellerId: string,
  data: SellerUpdateAttrs
): Promise<AxiosResponse> {
  const result = await sellerAxios.patch(`/${sellerId}`, data);
  return result;
};

export const getSellerByUsername = async function (
  username: string
): Promise<AxiosResponse> {
  const result = await sellerAxios.get(`/username/${username}`);
  return result;
};

export const getSellerByemail = async function (
  email: string
): Promise<AxiosResponse> {
  const result = await sellerAxios.get(`/email/${email}`);
  return result;
};

export const getRandomSellers = async function (
  count: number
): Promise<AxiosResponse> {
  const result = await sellerAxios.get(`/random/${count}`);
  return result;
};
