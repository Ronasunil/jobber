import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { createReview } from "@review/services/review";
import { ReviewCreationAttrs } from "@ronasunil/jobber-shared";

export const review = async function (req: Request, res: Response) {
  const body = req.body as ReviewCreationAttrs;
  console.log(body.type);
  const review = await createReview(body);

  res.status(httpStatus.OK).json({ messgae: "Review created", review });
};
