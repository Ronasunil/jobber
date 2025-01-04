import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { updateSeller } from "@user/services/sellerService";
import { SellerUpdateAttrs } from "@ronasunil/jobber-shared";

export const update = async function (req: Request, res: Response) {
  const { sellerId } = req.params as { sellerId: string };
  const data = req.body as SellerUpdateAttrs;

  await updateSeller(sellerId, data);
  res.status(httpStatus.OK).json({ message: "Updated seller" });
};
