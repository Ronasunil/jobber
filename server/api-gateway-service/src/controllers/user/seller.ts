import {
  createSeller,
  getRandomSellers,
  getSellerByemail,
  getSellerByUsername,
  updateSeller,
} from "@gateway/services/api/seller";
import {
  helpers,
  SellerCreationAttrs,
  SellerUpdateAttrs,
} from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const username = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { username } = req.params as { username: string };

  const result = await getSellerByUsername(username);
  return result;
});

export const email = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { email } = req.params as { email: string };

  const result = await getSellerByemail(email);
  return result;
});

export const randomSellers = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { count } = req.params as { count: string };
  const result = await getRandomSellers(+count);

  return result;
});

export const create = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const data = req.body as SellerCreationAttrs;
  const result = await createSeller(data);
  console.log(result);
  return result;
});

export const update = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { sellerId } = req.params as { sellerId: string };
  const data = req.body as SellerUpdateAttrs;

  const result = await updateSeller(sellerId, data);
  return result;
});
