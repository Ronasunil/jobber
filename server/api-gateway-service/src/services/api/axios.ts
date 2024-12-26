import { config } from "@gateway/Config";
import { helpers } from "@ronasunil/jobber-shared";
import axios, { AxiosInstance } from "axios";

export const axiosInstance = function (baseUrl: string): AxiosInstance {
  const instance = axios.create({
    withCredentials: true,
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "gateway-header": helpers.hashValue(config.API_GATEWAY_HEADER!),
    },
  });

  return instance;
};
