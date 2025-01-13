import { Router } from "express";
import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";

import { create } from "@gig/controllers/create";
import { Request, Response } from "express";
import { destroy } from "@gig/controllers/delete";
import { update } from "@gig/controllers/update";
import { gigCreateSchema } from "@gig/schemas/create";
import { gigUpdateSchema } from "@gig/schemas/update";

export const commandRoutes = function (): Router {
  const commandRouter = Router();
  const basePath = "/api/v1/gigs";

  commandRouter.post(
    `${basePath}`,
    gatewayMiddleware,
    validateJoi(gigCreateSchema),
    create
  );

  commandRouter.delete(
    `${basePath}/:sellerId/:gigId`,
    gatewayMiddleware,
    destroy
  );
  commandRouter.patch(
    `${basePath}/:sellerId/:gigId`,
    gatewayMiddleware,
    validateJoi(gigUpdateSchema),
    update
  );

  return commandRouter;
};
