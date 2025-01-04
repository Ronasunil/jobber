import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { getGigById, searchGig } from "@auth/services/searchService";
import { GigsQuery, helpers } from "@ronasunil/jobber-shared";

export const queryGigs = async function (req: Request, res: Response) {
  const { from, max, min, query, size } = helpers.getGigsQuery(
    req.query as unknown as GigsQuery
  );
  console.log({ from, size, min, max }, req.query);
  const gigs = await searchGig(query, { from, size, min, max });
  res.status(httpStatus.OK).json({ message: "Gigs", gigs });
};

export const queryGigById = async function (req: Request, res: Response) {
  const { gigId } = req.params as { gigId: string };

  const gig = await getGigById("gigs", gigId);
  res.status(httpStatus.OK).json({ message: "Gig", gig });
};
