import {
  getBuyerByEmail,
  getBuyerByUsername,
} from "@gateway/services/api/buyer";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const email = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { email } = req.params as { email: string };
  const result = await getBuyerByEmail(email);

  return result;
});

export const username = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { username } = req.params;
  const result = await getBuyerByUsername(username);

  return result;
});

export const currentUserByUsername = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const result = await getBuyerByUsername(req.currentUser!.username);
  return result;
});
