import { queryGigById, queryGigs } from "@auth/controllers/search";
import { gatewayMiddleware } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const searchRoutes = function (): Router {
  const router = Router();
  const basePath = "/api/v1/auth";

  router.get(`${basePath}/gigs/search`, gatewayMiddleware, queryGigs);
  router.get(`${basePath}/gigs/search/:gigId`, gatewayMiddleware, queryGigById);

  return router;
};
