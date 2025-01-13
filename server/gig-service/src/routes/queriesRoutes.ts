import {
  gigByActiveStatus,
  gigByCategories,
  gigById,
  sellerGigs,
  similarGigs,
  topRatedGigs,
} from "@gig/controllers/get";

import { gatewayMiddleware } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const queriesRoutes = function (): Router {
  const queriesRouter = Router();
  const basePath = "/api/v1/gigs";

  queriesRouter.get(`${basePath}/top-rated`, gatewayMiddleware, topRatedGigs);

  queriesRouter.get(`${basePath}/:gigId`, gatewayMiddleware, gigById);
  queriesRouter.get(
    `${basePath}/seller/:sellerId`,
    gatewayMiddleware,
    sellerGigs
  );
  queriesRouter.get(
    `${basePath}/seller/status/:sellerId/:status`,
    gatewayMiddleware,
    gigByActiveStatus
  );

  queriesRouter.get(
    `${basePath}/similar/:gigId`,
    gatewayMiddleware,
    similarGigs
  );

  queriesRouter.get(
    `${basePath}/category/:category`,
    gatewayMiddleware,
    gigByCategories
  );

  return queriesRouter;
};
