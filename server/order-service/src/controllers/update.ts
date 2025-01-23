import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import {
  approveOrder,
  cancelOrder,
  deliverOrder,
  deliveryExtensionRequest,
  extensionRequestStatus,
  offerGig,
} from "@order/services/orderService";

import { stripe } from "@order/controllers/global";
import { ExtensionRequest, OfferRequest } from "@ronasunil/jobber-shared";

export const orderCancellation = async function (req: Request, res: Response) {
  const { orderId } = req.params as { orderId: string };

  const order = await cancelOrder(orderId, stripe);
  res
    .status(httpStatus.OK)
    .json({ message: "order has been cancelled", order });
};

export const orderApproval = async function (req: Request, res: Response) {
  const { orderId } = req.params as { orderId: string };

  const order = await approveOrder(orderId);
  res.status(httpStatus.OK).json({ message: "order has been approved", order });
};

export const orderDelivered = async function (req: Request, res: Response) {
  const { orderId } = req.params as { orderId: string };
  const { file } = req.body as { file: string };

  const order = await deliverOrder(orderId, file);
  res
    .status(httpStatus.OK)
    .json({ message: "order has been delivered", order });
};

export const deliveryExtension = async function (req: Request, res: Response) {
  const { orderId } = req.params as { orderId: string };
  const body = req.body as ExtensionRequest;

  const order = await deliveryExtensionRequest(orderId, body);
  res
    .status(httpStatus.OK)
    .json({ message: "order has been delivered", order });
};

export const acceptOrRejectExtension = async function (
  req: Request,
  res: Response
) {
  const { orderId } = req.params as {
    orderId: string;
  };

  const body = req.body as { accepted: boolean; rejected: boolean };
  const order = await extensionRequestStatus(orderId, body);
  res
    .status(httpStatus.OK)
    .json({ message: "Order is either accepted or rejected", order });
};

export const gigOffer = async function (req: Request, res: Response) {
  const { orderId } = req.params as {
    orderId: string;
  };

  const body = req.body as OfferRequest;
  const order = await offerGig(orderId, body);
  res.status(httpStatus.OK).json({ message: "Offer gig", order });
};
