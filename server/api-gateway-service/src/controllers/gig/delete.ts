import { Request, Response } from "express";
import { deleteGig } from "@gateway/services/api/gig";
import { helpers } from "@ronasunil/jobber-shared";

export const destroy = helpers.asyncWrapper(
  async (req: Request, _res: Response) => {
    const { gigId, sellerId } = req.params as {
      sellerId: string;
      gigId: string;
    };
    const result = await deleteGig(sellerId, gigId);
    return result;
  }
);
