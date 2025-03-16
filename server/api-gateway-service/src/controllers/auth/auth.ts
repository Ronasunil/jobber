import { Request, Response } from "express";

import {
  currentUser,
  resendVerificationMail,
  signin,
  signup,
  verifyMail,
} from "@gateway/services/api/auth";
import {
  AuthRequestPayload,
  helpers,
  winstonLogger,
} from "@ronasunil/jobber-shared";
import { config } from "@gateway/Config";
import { AxiosResponse } from "axios";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
  "info"
);

export const signupGateway = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const body = req.body as unknown as AuthRequestPayload;

  const response = await signup(body);

  req.session = {
    jwt: response.data.token,
  };

  return response;
});

export const signInGateway = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { email, password } = req.body as { email: string; password: string };
  const response = await signin({ email, password });

  req.session = {
    jwt: response.data.token,
  };

  return response;
});

export const verifyMailGateway = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { token, email } = req.query as { token: string; email: string };

  const response = await verifyMail(email, token);

  return response;
});

export const resendVerificationMailGateway = async function (
  req: Request,
  res: Response
) {
  const { email } = req.query as { email: string };

  const response = await resendVerificationMail(email);

  res.status(response.status).json({ message: response.data.message });
};

export const currentUserGateway = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const response = await currentUser(req.currentUser!.id);
  return response;
});
