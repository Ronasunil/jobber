import { review } from "@gateway/controllers/review/create";
import {
  gigReviews,
  reviewById,
  sellerReviews,
} from "@gateway/controllers/review/get";
import { destroy } from "@gateway/controllers/review/update";
import { checkUserExist } from "@gateway/grpc/authClient";
import {
  checkUserExistance,
  passCurrentUser,
  verifyUser,
  verifyUserInReq,
} from "@gateway/middlewares/authMiddleware";
import { reviewAxios } from "@gateway/services/api/review";
import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const reviewRoutes = function (): Router {
  const reviewRouter = Router();
  const BASE_PATH = "/api/v1/reviews";

  reviewRouter.post(BASE_PATH, verifyUser, verifyUserInReq, review);
  reviewRouter.patch(
    `${BASE_PATH}/:reviewId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    passCurrentUser(reviewAxios),
    destroy
  );
  reviewRouter.get(
    `${BASE_PATH}/:reviewId`,
    verifyUser,
    verifyUserInReq,

    checkUserExistance,
    reviewById
  );
  reviewRouter.get(
    `${BASE_PATH}/seller/:sellerId`,
    verifyUser,
    verifyUserInReq,

    checkUserExistance,
    sellerReviews
  );

  reviewRouter.get(
    `${BASE_PATH}/gig/:gigId`,
    verifyUser,
    verifyUserInReq,

    checkUserExistance,
    gigReviews
  );

  return reviewRouter;
};
