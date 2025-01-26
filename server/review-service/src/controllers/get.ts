import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import {
  getGigReviews,
  getReviewById,
  getSellerReviews,
} from "@review/services/review";

export const gigReviews = async function (req: Request, res: Response) {
  const { gigId } = req.params as { gigId: string };
  const reviews = await getGigReviews(gigId);

  res.status(httpStatus.OK).json({ message: "All reviews of a gig", reviews });
};

export const sellerReviews = async function (req: Request, res: Response) {
  const { sellerId } = req.params as { sellerId: string };
  const reviews = await getSellerReviews(sellerId);

  res
    .status(httpStatus.OK)
    .json({ message: "All reviews of a seller", reviews });
};

export const reviewById = async function (req: Request, res: Response) {
  const { reviewId } = req.params as { reviewId: string };
  const review = await getReviewById(reviewId);

  res.status(httpStatus.OK).json({ message: "review", review });
};
