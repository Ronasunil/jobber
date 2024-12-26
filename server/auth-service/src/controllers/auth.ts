import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { v4 as uuidV4 } from "uuid";

import {
  createAuthUser,
  getUserByEmail,
  getUserByEmailOrUsername,
  getUserById,
  updateEmailVerificationToken,
} from "@auth/services/authService";
import {
  AuthRequestPayload,
  BadRequest,
  EmailAuth,
} from "@ronasunil/jobber-shared";

import { publishDirectMessage } from "@auth/queues/authProducer";
import { authChannel } from "@auth/server";
import { generateToken, signToken } from "@auth/utils/helpers";
import { AuthDoc, AuthInput } from "@auth/interfaces/authInterface";
import { config } from "@auth/Config";
import { passwordManager } from "@auth/utils/PasswordManager";

export const getResentEmailLocals = function (result: AuthDoc) {
  const locals: EmailAuth = {
    receiverEmail: result.email,
    template: "verifyEmail",
    username: result.username,
    resetLink: "",
    verifyLink: `http://localhost:${config.PORT}/auth/${result.email}/verify?token=${result.emailVerificationToken}`,
  };

  return locals;
};

export const signup = async function (req: Request, res: Response) {
  const { country, email, password, username } = req.body as AuthRequestPayload;

  //check  user already exist
  const user = await getUserByEmailOrUsername(username, email);
  if (user) throw new BadRequest("User already exist", "singup():");

  // storing user
  const userData: AuthInput = {
    country,
    email,
    password,
    username,
    createdAt: new Date(),
    emailVerificationToken: uuidV4(),
    publicId: generateToken(),
  };

  const result = await createAuthUser(userData);
  const token = signToken(result);

  //   publishing email
  const message = JSON.stringify(getResentEmailLocals(result));
  await publishDirectMessage(
    authChannel,
    "email-auth-notifications",
    "email-auth",
    message,
    "verify email notification sent successfully "
  );

  res.status(httpStatus.CREATED).json({
    message: "User created successfully",
    status: "OK",
    user: result,
    token,
  });
};

export const signin = async function (req: Request, res: Response) {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const user = await getUserByEmail(email);
  if (!user)
    throw new BadRequest("Invalid credentials", "Auth service signin():");

  const isAuthenticate = await passwordManager.comparePassword(
    password,
    user.password
  );
  if (!isAuthenticate)
    throw new BadRequest("Invalid credentials", "Auth service signin():");

  const token = signToken(user);

  res
    .status(httpStatus.OK)
    .json({ message: "Signin successfull", user, token });
};

export const verifyMail = async function (req: Request, res: Response) {
  const { token, email } = req.query as { token: string; email: string };

  if (!token)
    throw new BadRequest("Invalid token", "mailVerification(): auth service");

  const user = await getUserByEmail(email);
  if (!user)
    throw new BadRequest("User not found", "mailVerification(): auth service");

  if (token !== user.emailVerificationToken)
    throw new BadRequest("Invalid token", "mailVerification(): auth service");

  await updateEmailVerificationToken(email, "", 1);

  res.status(httpStatus.OK).json({ message: "Mail verified" });
};

export const resendVerificationMail = async function (
  req: Request,
  res: Response
) {
  const { email } = req.query as { email: string };

  const user = await getUserByEmail(email);

  if (!user)
    throw new BadRequest(
      "Invalid token",
      "resendVerificationMail(): auth service"
    );

  updateEmailVerificationToken(user.email, generateToken(), 0);

  //   publishing email
  const message = JSON.stringify(getResentEmailLocals(user));
  await publishDirectMessage(
    authChannel,
    "email-auth-notifications",
    "email-auth",
    message,
    "verify email notification sent successfully "
  );

  res.status(httpStatus.OK).json({ message: "Mail sent" });
};

export const currentUser = async function (req: Request, res: Response) {
  const { userId } = req.params as { userId: string };
  const user = await getUserById(+userId);

  if (!user)
    throw new BadRequest("User not found", "currentUser(): auth service");

  res.status(httpStatus.OK).json({ message: "User", user });
};
