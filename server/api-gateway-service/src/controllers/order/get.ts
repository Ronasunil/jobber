import { Request, Response } from "express";
import {
  getBuyerOrders,
  getOrderById,
  getSellerAcceptedOrders,
} from "@gateway/services/api/order";
import { helpers } from "@ronasunil/jobber-shared";

export const orderBuyers = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { buyerId } = req.params as { buyerId: string };

  const result = await getBuyerOrders(buyerId);
  return result;
});

export const sellerAcceptedGigs = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { sellerId } = req.params as { sellerId: string };

  const result = await getSellerAcceptedOrders(sellerId);
  return result;
});

export const orderById = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { orderId } = req.params as { orderId: string };

  const result = await getOrderById(orderId);
  return result;
});
