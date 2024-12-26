import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { v4 as uuidV4 } from "uuid";

import {
  getUserByEmail,
  getUserByPasswordResetToken,
  updatePassword,
  updatePasswordResetToken,
} from "@auth/services/authService";
import { BadRequest, EmailAuth, Payload } from "@ronasunil/jobber-shared";
import { addHalfHour, generateToken, getBasePath } from "@auth/utils/helpers";
import { AuthDoc } from "@auth/interfaces/authInterface";
import { config } from "@auth/Config";
import { publishDirectMessage } from "@auth/queues/authProducer";
import { authChannel } from "@auth/server";
import { passwordManager } from "@auth/utils/PasswordManager";

declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}

const getEmailLocals = function (user: AuthDoc, token: string) {
  const basePath = getBasePath();
  const locals: EmailAuth = {
    receiverEmail: user.email,
    resetLink: `http://localhost:${config.PORT}${basePath}/password/reset/${token}?email=${user.email}`,
    template: "forgotPassword",
    username: user.username,
    verifyLink: "",
  };

  return locals;
};

export const changePassword = async function (req: Request, _res: Response) {
  const { confirmNewPassword, password, newPassword } = req.body as {
    password: string;
    confirmNewPassword: string;
    newPassword: string;
  };
  const { email } = req.query as { email: string };
  const user = await getUserByEmail(email);
  if (!user)
    throw new BadRequest("User not found", "Auth service changePassword():");

  //   checking is password correct
  const isAuthenticated = await passwordManager.comparePassword(
    password,
    user.password
  );
  if (!isAuthenticated)
    throw new BadRequest(
      "Invalid credentials",
      "Auth service changePassword():"
    );

  // check new passwords are same
  if (confirmNewPassword !== newPassword)
    throw new BadRequest(
      "Passwords must be same",
      "Auth service changePassword():"
    );

  //   change password
  await updatePassword(user.id, password, undefined);
};

export const forgotPassword = async function (req: Request, res: Response) {
  const { email } = req.body as { email: string };

  //  check user existance
  const user = await getUserByEmail(email);
  if (!user)
    throw new BadRequest("User not found", "Auth service forgotPassword():");

  //   generating token and reset time for password reset
  const token = uuidV4();
  const futureTime = addHalfHour();

  //   setting message for publishing
  const message = JSON.stringify(getEmailLocals(user, token));

  //   updating user with token and futureTime
  await updatePasswordResetToken(token, email, futureTime);

  //   publish message to queue
  publishDirectMessage(
    authChannel,
    "email-auth-notifications",
    "email-auth",
    message,
    "Reset password mail sent successfully"
  );

  res.status(httpStatus.OK).json({ message: "Reset password mail sent" });
};

export const resetPassword = async function (req: Request, res: Response) {
  const { token } = req.params as { token: string };
  const { email } = req.query as { email: string };
  const { password } = req.body as {
    password: string;
    confirmPassword: string;
  };

  if (!token)
    new BadRequest("Token doesn't exist", "resetPassword(): auth service");

  const user = await getUserByPasswordResetToken(email, token);
  if (!user)
    throw new BadRequest("Invalid token", "resetpassword(): auth service");

  await updatePassword(user.id, password, undefined);

  res.status(httpStatus.OK).json({ message: "Password updated" });
};
