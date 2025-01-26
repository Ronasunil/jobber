import { review } from "@review/controllers/create";
import { gigReviews, reviewById, sellerReviews } from "@review/controllers/get";
import { destroy } from "@review/controllers/update";
import { reviewCreationSchema } from "@review/schemas/reviewSchema";
import {
  currentUserInReq,
  gatewayMiddleware,
  Payload,
  validateJoi,
} from "@ronasunil/jobber-shared";
import { NextFunction, Request, Response, Router } from "express";

declare global {
  namespace Express {
    interface Request {
      currentUser?: Payload;
    }
  }
}

export const reviewRoutes = function (): Router {
  const reviewRouter = Router();
  const basePath = "/api/v1/reviews";

  reviewRouter.post(
    basePath,
    gatewayMiddleware,
    validateJoi(reviewCreationSchema),
    review
  );
  reviewRouter.patch(
    `${basePath}/:reviewId`,
    gatewayMiddleware,
    currentUserInReq,
    destroy
  );
  reviewRouter.get(`${basePath}/:reviewId`, gatewayMiddleware, reviewById);
  reviewRouter.get(
    `${basePath}/seller/:sellerId`,
    gatewayMiddleware,
    sellerReviews
  );

  reviewRouter.get(`${basePath}/gig/:gigId`, gatewayMiddleware, gigReviews);

  return reviewRouter;
};
