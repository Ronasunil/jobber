import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { createSeller } from "@user/services/sellerService";
import { SellerCreationAttrs } from "@ronasunil/jobber-shared";

export const create = async function (req: Request, res: Response) {
  const data = req.body as SellerCreationAttrs;
  await createSeller(data);

  res.status(httpStatus.OK).json({ message: "Seller created" });
};
