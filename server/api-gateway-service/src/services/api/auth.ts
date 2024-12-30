import { config } from "@gateway/Config";

import { AuthRequestPayload } from "@ronasunil/jobber-shared";
import { AxiosResponse } from "axios";
import { axiosInstance } from "@gateway/services/axios";

export const authAxios = axiosInstance(`${config.AUTH_SERVICE_URL!}/api/v1`);

export const signup = async function (
  body: AuthRequestPayload
): Promise<AxiosResponse> {
  const result = await authAxios.post("/auth/signup", body);
  return result;
};

export const signin = async function (body: {
  email: string;
  password: string;
}): Promise<AxiosResponse> {
  const result = await authAxios.post("/auth/signin", body);
  return result;
};

export const forgotPassword = async function (body: {
  email: string;
}): Promise<AxiosResponse> {
  const result = await authAxios.post("/auth/forgot-password", body);
  return result;
};

export const resendVerificationMail = async function (
  email: string
): Promise<AxiosResponse> {
  const result = await authAxios.get(`/auth/email/verification?email=${email}`);
  return result;
};

export const verifyMail = async function (
  email: string,
  token: string
): Promise<AxiosResponse> {
  const result = await authAxios.patch(
    `/auth/verify?token=${token}&email=${email}`
  );
  return result;
};

export const changePassword = async function (
  body: {
    confirmNewPassword: string;
    password: string;
    newPassword: string;
  },
  email: string
): Promise<AxiosResponse> {
  const result = await authAxios.patch(`/auth/password?email=${email}`, body);
  return result;
};

export const resetPassword = async function (
  body: { password: string; confirmPassword: string },
  token: string,
  email: string
): Promise<AxiosResponse> {
  const result = await authAxios.patch(
    `/auth/password/reset/${token}?email=${email}`,
    body
  );

  return result;
};

export const currentUser = async function (
  userId: string
): Promise<AxiosResponse> {
  const result = await authAxios.get(`/auth/current-user/${userId}`);
  return result;
};
