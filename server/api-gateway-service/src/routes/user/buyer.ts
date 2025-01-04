import { email, username } from "@gateway/controllers/user/buyer";
import { Router } from "express";

export const buyerRoutes = function (): Router {
  const buyerRouter = Router();
  const BASE_PATH = "/api/v1/buyer";

  buyerRouter.get(`${BASE_PATH}/username/:username`, username);
  buyerRouter.get(`${BASE_PATH}/email/:email`, email);

  return buyerRouter;
};
