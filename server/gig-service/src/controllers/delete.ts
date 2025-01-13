import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { deleteGig } from "@gig/services/command";

export const destroy = async function (req: Request, res: Response) {
  const { gigId, sellerId } = req.params as { sellerId: string; gigId: string };
  await deleteGig(sellerId, gigId);

  res.status(httpStatus.NO_CONTENT).json();
};
