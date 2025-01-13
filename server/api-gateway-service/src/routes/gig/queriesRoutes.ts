import {
  getGigByActiveStatus,
  gigByCategories,
  sellerGigs,
  similarGigs,
  topRatedGigs,
} from "@gateway/controllers/gig/get";
import {
  checkUserExistance,
  verifyUser,
  verifyUserInReq,
} from "@gateway/middlewares/authMiddleware";

import { Router } from "express";

export const queriesRoutes = function (): Router {
  const queriesRouter = Router();
  const BASE_PATH = "/api/v1/gigs";

  queriesRouter.get(
    `${BASE_PATH}/seller/:sellerId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    sellerGigs
  );
  queriesRouter.get(
    `${BASE_PATH}/seller/status/:sellerId/:status`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    getGigByActiveStatus
  );

  queriesRouter.get(`${BASE_PATH}/similar/:gigId`, similarGigs);

  queriesRouter.get(`${BASE_PATH}/top-rated`, topRatedGigs);
  queriesRouter.get(`${BASE_PATH}/category/:category`, gigByCategories);

  return queriesRouter;
};
