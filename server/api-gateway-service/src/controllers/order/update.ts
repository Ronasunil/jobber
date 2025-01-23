import { Request, Response } from "express";

import {
  ExtensionRequest,
  helpers,
  OfferRequest,
} from "@ronasunil/jobber-shared";
import {
  cancelOrder,
  deliverOrder,
  deliveryExtensionReq,
  deliveryExtensionStatus,
  offerGig,
} from "@gateway/services/api/order";

export const orderCancellation = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { orderId } = req.params as { orderId: string };

  const result = await cancelOrder(orderId);
  return result;
});

export const orderApproval = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { orderId } = req.params as { orderId: string };
  const body = req.body as unknown as {
    accepted: boolean;
    rejected: boolean;
  };

  const result = await deliveryExtensionStatus(orderId, body);
  return result;
});

export const orderDelivered = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { orderId } = req.params as { orderId: string };
  const { file } = req.body as { file: string };

  const result = await deliverOrder(orderId, file);
  return result;
});

export const deliveryExtension = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { orderId } = req.params as { orderId: string };
  const body = req.body as ExtensionRequest;

  const result = await deliveryExtensionReq(orderId, body);
  return result;
});

export const acceptOrRejectExtension = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { orderId } = req.params as {
    orderId: string;
  };

  const body = req.body as { accepted: boolean; rejected: boolean };
  const result = await deliveryExtensionStatus(orderId, body);

  return result;
});

export const gigOffer = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { orderId } = req.params as {
    orderId: string;
  };

  const body = req.body as OfferRequest;

  const result = await offerGig(orderId, body);
  return result;
});
