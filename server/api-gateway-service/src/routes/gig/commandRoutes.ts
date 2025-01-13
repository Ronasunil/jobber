import { create } from "@gateway/controllers/gig/create";
import { destroy } from "@gateway/controllers/gig/delete";
import { update } from "@gateway/controllers/gig/update";
import {
  checkUserExistance,
  verifyUser,
  verifyUserInReq,
} from "@gateway/middlewares/authMiddleware";

import { Router } from "express";

export const commandRoutes = function (): Router {
  const commandRouter = Router();
  const BASE_PATH = "/api/v1/gigs";

  commandRouter.post(
    `${BASE_PATH}`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    create
  );
  commandRouter.delete(
    `${BASE_PATH}/:sellerId/:gigId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    destroy
  );
  commandRouter.patch(
    `${BASE_PATH}/:sellerId/:gigId`,
    verifyUser,
    verifyUserInReq,
    checkUserExistance,
    update
  );

  return commandRouter;
};
