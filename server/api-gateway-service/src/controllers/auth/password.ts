import {
  changePassword,
  forgotPassword,
  resetPassword,
} from "@gateway/services/api/auth";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const changePasswordGateway = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { confirmNewPassword, password, newPassword } = req.body as {
    password: string;
    confirmNewPassword: string;
    newPassword: string;
  };

  const response = await changePassword(
    {
      confirmNewPassword,
      newPassword,
      password,
    },
    req.currentUser!.email
  );

  return response;
});

export const forgotPasswordGateway = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { email } = req.body as { email: string };

  const response = await forgotPassword({ email });
  return response;
});

export const resetPasswordGateway = async function (
  req: Request,
  res: Response
) {
  const { token } = req.params as { token: string };
  const { email } = req.query as { email: string };
  const { password, confirmPassword } = req.body as {
    password: string;
    confirmPassword: string;
  };

  const response = await resetPassword(
    { confirmPassword, password },
    token,
    email
  );

  res.status(response.status).json({ message: response.data.message });
};
