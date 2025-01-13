import { Request, Response } from "express";
import { GigUpdateAttrs, helpers } from "@ronasunil/jobber-shared";
import { updateGig } from "@gateway/services/api/gig";

export const update = helpers.asyncWrapper(
  async (req: Request, _res: Response) => {
    const body = req.body as GigUpdateAttrs;
    const { gigId, sellerId } = req.params as {
      sellerId: string;
      gigId: string;
    };

    const result = await updateGig(sellerId, gigId, body);
    return result;
  }
);
