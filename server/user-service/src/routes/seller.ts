import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";
import { create } from "@user/controllers/seller/create";
import { email, randomSellers, username } from "@user/controllers/seller/get";
import { update } from "@user/controllers/seller/update";
import { sellerSchema, sellerUpdateSchema } from "@user/schemas/sellerSchema";
import { Router } from "express";

export const sellerRoutes = function (): Router {
  const sellerRouter = Router();
  const basePath = "/api/v1/seller";

  sellerRouter.get(
    `${basePath}/username/:username`,
    gatewayMiddleware,
    username
  );

  sellerRouter.get(`${basePath}/email/:email`, gatewayMiddleware, email);

  sellerRouter.get(
    `${basePath}/random/:count`,
    gatewayMiddleware,
    randomSellers
  );

  sellerRouter.patch(
    `${basePath}/:sellerId`,
    gatewayMiddleware,
    validateJoi(sellerUpdateSchema),
    update
  );

  sellerRouter.post(
    basePath,
    gatewayMiddleware,
    validateJoi(sellerSchema),
    create
  );

  return sellerRouter;
};
