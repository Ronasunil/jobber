import { deleteReview } from "@gateway/services/api/review";
import { helpers } from "@ronasunil/jobber-shared";
import { Request, Response } from "express";

export const destroy = helpers.asyncWrapper(async function (
  req: Request,
  res: Response
) {
  const { reviewId } = req.params as { reviewId: string };
  const result = await deleteReview(reviewId);

  return result;
});
