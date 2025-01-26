import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { helpers, ReviewCreationAttrs } from "@ronasunil/jobber-shared";
import { createReview } from "@gateway/services/api/review";

export const review = helpers.asyncWrapper(async function (
  req: Request,
  _res: Response
) {
  const body = req.body as ReviewCreationAttrs;
  const result = await createReview(body);

  return result;
});
