import { Request, Response } from "express";

import { searchGigbyId, searchGigs } from "@gateway/services/api/gig";
import { GigsQuery, helpers } from "@ronasunil/jobber-shared";

export const queryGigs = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { from, max, min, query, size } = req.query as unknown as GigsQuery;
  const result = searchGigs({ query, from, max, min, size });

  return result;
});

export const queryGigById = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { gigId } = req.params as { gigId: string };
  const result = await searchGigbyId(gigId);
  return result;
});
