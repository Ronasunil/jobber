import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import {
  getBuyerOrders,
  getOrderById,
  getSellerAcceptedOrders,
} from "@order/services/orderService";

export const orderBuyers = async function (req: Request, res: Response) {
  const { buyerId } = req.params as { buyerId: string };
  const orders = await getBuyerOrders(buyerId);

  res.status(httpStatus.OK).json({ message: "Order of buyers", orders });
};

export const sellerAcceptedGigs = async function (req: Request, res: Response) {
  const { sellerId } = req.params as { sellerId: string };
  const orders = await getSellerAcceptedOrders(sellerId);

  res
    .status(httpStatus.OK)
    .json({ message: "Seller accepted gig orders", orders });
};

export const orderById = async function (req: Request, res: Response) {
  const { orderId } = req.params as { orderId: string };
  const order = await getOrderById(orderId);

  res.status(httpStatus.OK).json({ message: "Order", order });
};
