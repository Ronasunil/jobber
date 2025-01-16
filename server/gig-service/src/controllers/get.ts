declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}

import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import {
  getGigByCategories,
  getGigById,
  getSimilarGig,
  getTopRatedGigs,
} from "@gig/services/queries";
import { getGigByActiveStatus, getGigBySellerId } from "@gig/elasticsearch";
import { BadRequest, Payload } from "@ronasunil/jobber-shared";
import { GigHit } from "@gig/interfaces/gigInterface";
import { getGigCategoryCache, saveGigCategoryCache } from "@gig/cache/gigCache";

export const gigById = async function (req: Request, res: Response) {
  const { gigId } = req.params as { gigId: string };
  const gig = await getGigById(gigId);

  res.status(httpStatus.OK).json({ message: "Gig", gig });
};

export const sellerGigs = async function (req: Request, res: Response) {
  const { sellerId } = req.params as { sellerId: string };
  const gigs = await getGigBySellerId(sellerId);

  res.status(httpStatus.OK).json({ message: "Gig", gigs });
};

export const gigByActiveStatus = async function (req: Request, res: Response) {
  const { sellerId, status } = req.params as {
    sellerId: string;
    status: "true" | "false";
  };
  console.log(status);
  if (status !== "false" && status !== "true")
    throw new BadRequest(
      "Status must be true or false",
      "gigByStatus(): gig service"
    );

  const gigs = await getGigByActiveStatus(
    sellerId,
    JSON.parse(status) as Boolean
  );

  res.status(httpStatus.OK).json({ message: "Active gigs", gigs });
};

export const similarGigs = async function (req: Request, res: Response) {
  const { gigId } = req.params as { gigId: string };
  const gigs = await getSimilarGig(gigId);

  res.status(httpStatus.OK).json({ message: "Similar gigs", gigs });
};

export const topRatedGigs = async function (_req: Request, res: Response) {
  const gigs = await getTopRatedGigs();
  res.status(httpStatus.OK).json({ message: "Top gigs", gigs });
};

export const gigByCategories = async function (req: Request, res: Response) {
  const { category } = req.params as { category: string };
  const cacheKey = `category:${category}`
  ;
  const cacheGig = await getGigCategoryCache(cacheKey);
  let gigs: GigHit[];

  if (!cacheGig) {
    gigs = await getGigByCategories(category);
    saveGigCategoryCache(cacheKey, gigs);
  } else gigs = cacheGig;

  res.status(httpStatus.OK).json({ message: `${category} gigs`, gigs });
};
