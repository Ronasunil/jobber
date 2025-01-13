import { Request, Response } from "express";
import { GigCreationAttrs, helpers } from "@ronasunil/jobber-shared";
import { createGig } from "@gateway/services/api/gig";

export const create = helpers.asyncWrapper(
  async (req: Request, _res: Response) => {
    const data = req.body as GigCreationAttrs;

    const result = await createGig(data);
    return result;
  }
);
