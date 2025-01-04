import { config } from "@gateway/Config";
import { axiosInstance } from "@gateway/services/axios";
import { AxiosResponse } from "axios";

export const buyerAxios = axiosInstance(
  `${config.USER_SERVICE_URL}/api/v1/buyer`
);

export const getBuyerByUsername = async function (
  username: string
): Promise<AxiosResponse> {
  const result = await buyerAxios.get(`/username/${username}`);
  return result;
};

export const getBuyerByEmail = async function (
  email: string
): Promise<AxiosResponse> {
  const result = await buyerAxios.get(`/email/${email}`);
  return result;
};
