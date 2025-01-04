import {
  create,
  email,
  randomSellers,
  update,
  username,
} from "@gateway/controllers/user/seller";
import { Router } from "express";

export const sellerRoutes = function (): Router {
  const sellerRouter = Router();
  const BASE_PATH = "/api/v1/seller";

  sellerRouter.get(`${BASE_PATH}/username/:username`, username);

  sellerRouter.get(`${BASE_PATH}/email/:email`, email);

  sellerRouter.get(`${BASE_PATH}/random/:count`, randomSellers);

  sellerRouter.patch(`${BASE_PATH}/:sellerId`, update);
  sellerRouter.post(BASE_PATH, create);

  return sellerRouter;
};
