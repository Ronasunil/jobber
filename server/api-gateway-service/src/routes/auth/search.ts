import { queryGigById, queryGigs } from "@gateway/controllers/auth/search";
import { Router } from "express";

export const searchRoutes = function (): Router {
  const searchRouter = Router();
  const BASE_PATH = "/api/v1/auth/gigs";
  searchRouter.get(`${BASE_PATH}/search`, queryGigs);
  searchRouter.get(`${BASE_PATH}/:gigId`, queryGigById);

  return searchRouter;
};
