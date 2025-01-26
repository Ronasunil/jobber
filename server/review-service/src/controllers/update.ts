import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { deleteReview } from "@review/services/review";
import { Payload } from "@ronasunil/jobber-shared";

declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}

export const destroy = async function (req: Request, res: Response) {
  const { reviewId } = req.params as { reviewId: string };
  await deleteReview(reviewId, req.currentUser!.username);

  res.status(httpStatus.OK).json({ message: "Review soft deleted" });
};
