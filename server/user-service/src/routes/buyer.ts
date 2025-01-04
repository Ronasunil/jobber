import { gatewayMiddleware } from "@ronasunil/jobber-shared";
import { email, username } from "@user/controllers/buyer/get";
import { Router } from "express";

export const buyerRoutes = function (): Router {
  const buyerRouter = Router();
  const basePath = "/api/v1/buyer";
  buyerRouter.get(
    `${basePath}/username/:username`,
    gatewayMiddleware,
    username
  );

  buyerRouter.get(`${basePath}/email/:email`, gatewayMiddleware, email);
  return buyerRouter;
};
