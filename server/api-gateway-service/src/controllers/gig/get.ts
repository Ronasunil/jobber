import { Request, Response } from "express";
import {
  getGigByCategory,
  getSimilarGigs,
  getTopRatedGigs,
  gigByActiveStatus,
  gigBySellerId,
} from "@gateway/services/api/gig";
import { helpers } from "@ronasunil/jobber-shared";

export const sellerGigs = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { sellerId } = req.params as { sellerId: string };
  const gigs = await gigBySellerId(sellerId);

  return gigs;
});

export const getGigByActiveStatus = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { sellerId, status } = req.params as {
    sellerId: string;
    status: "true" | "false";
  };

  const gigs = await gigByActiveStatus(sellerId, status);
  return gigs;
});

export const similarGigs = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { gigId } = req.params as { gigId: string };
  const gigs = await getSimilarGigs(gigId);

  return gigs;
});

export const topRatedGigs = helpers.asyncWrapper(async function (
  _req: Request,
  _res: Response
) {
  const gigs = await getTopRatedGigs();
  return gigs;
});

export const gigByCategories = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { category } = req.params as { category: string };

  const gigs = await getGigByCategory(category);

  return gigs;
});


