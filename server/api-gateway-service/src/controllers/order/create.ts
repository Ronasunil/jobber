import { createIntent, createOrders } from "@gateway/services/api/order";
import { helpers, OrderCreationAttr } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const intent = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const result = await createIntent(req.currentUser!.email);
  return result;
});

export const order = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const body = req.body as unknown as OrderCreationAttr;

  const result = await createOrders(body);
  return result;
});
