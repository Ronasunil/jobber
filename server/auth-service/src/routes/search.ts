import { queryGigById, queryGigs } from "@auth/controllers/search";
import { getBasePath } from "@auth/utils/helpers";
import { gatewayMiddleware } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const searchRoutes = function (): Router {
  const router = Router();
  const basePath = getBasePath();

  router.get(`${basePath}/gigs/search`, gatewayMiddleware, queryGigs);
  router.get(`${basePath}/gigs/search/:gigId`, gatewayMiddleware, queryGigById);

  return router;
};
