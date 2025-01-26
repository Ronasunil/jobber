import {
  getGigReviews,
  getReviewById,
  getSellerReviews,
} from "@gateway/services/api/review";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const gigReviews = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { gigId } = req.params as { gigId: string };
  const result = await getGigReviews(gigId);
  return result;
});

export const sellerReviews = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { sellerId } = req.params as { sellerId: string };
  const result = await getSellerReviews(sellerId);

  return result;
});

export const reviewById = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const { reviewId } = req.params as { reviewId: string };
  const result = await getReviewById(reviewId);

  return result;
});
