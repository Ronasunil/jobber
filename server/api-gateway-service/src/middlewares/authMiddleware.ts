import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import {
  BadRequest,
  NotAuthorizedError,
  Payload,
} from "@ronasunil/jobber-shared";
import { config } from "@gateway/Config";
import { checkUserExist } from "@gateway/grpc/authClient";

declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}

export const verifyUser = function (
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.session?.jwt;

  if (!token)
    throw new NotAuthorizedError(
      "Invalid credentials",
      "verfiyUser(): gateway service"
    );

  try {
    const Payload = verify(token, config.JWT_SECRET!) as Payload;
    req.currentUser = Payload;
    next();
  } catch (err) {
    throw new NotAuthorizedError(
      "Invalid credentials try again",
      "verfiyUser(): gateway service"
    );
  }
};

export const verifyUserInReq = function (
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const user = req?.currentUser;
  if (!user)
    throw new NotAuthorizedError(
      "Please signup or signin to continue",
      "verfiyUserInReq(): gateway service"
    );
  next();
};

export const checkUserExistance = function (
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const user = checkUserExist(req.currentUser!.id);

  if (!user)
    throw new BadRequest(
      "User not found",
      "checkUserExistance(): gateway service"
    );

  next();
};
