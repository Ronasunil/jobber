import { intent, order } from "@gateway/controllers/order/create";
import {
  orderBuyers,
  orderById,
  sellerAcceptedGigs,
} from "@gateway/controllers/order/get";
import {
  acceptOrRejectExtension,
  deliveryExtension,
  gigOffer,
  orderApproval,
  orderCancellation,
  orderDelivered,
} from "@gateway/controllers/order/update";
import {
  verifyUser,
  verifyUserInReq,
} from "@gateway/middlewares/authMiddleware";
import { Router } from "express";

export const orderRoutes = function (): Router {
  const orderRouter = Router();
  const BASE_PATH = "api/v1/orders";

  // GET
  orderRouter.get(
    `${BASE_PATH}/:orderId`,
    verifyUserInReq,
    verifyUser,
    orderById
  );
  orderRouter.get(
    `${BASE_PATH}/sellers/:sellerId`,
    verifyUserInReq,
    verifyUser,
    sellerAcceptedGigs
  );
  orderRouter.get(
    `${BASE_PATH}/buyers/:buyerId`,
    verifyUserInReq,
    verifyUser,
    orderBuyers
  );

  // POST
  orderRouter.post(`${BASE_PATH}`, verifyUserInReq, verifyUser, order);

  orderRouter.post(`${BASE_PATH}/intent`, verifyUserInReq, verifyUser, intent);

  // PATCH
  orderRouter.patch(
    `${BASE_PATH}/:orderId/cancel`,
    verifyUserInReq,
    verifyUser,
    orderCancellation
  );

  orderRouter.patch(
    `${BASE_PATH}/:orderId/approve`,
    verifyUserInReq,
    verifyUser,
    orderApproval
  );
  orderRouter.patch(
    `${BASE_PATH}/:orderId/deliver`,
    verifyUserInReq,
    verifyUser,
    orderDelivered
  );
  orderRouter.patch(
    `${BASE_PATH}/:orderId/delivery-extension`,
    verifyUserInReq,
    verifyUser,
    deliveryExtension
  );

  orderRouter.patch(
    `${BASE_PATH}/:orderId/approval`,
    verifyUserInReq,
    verifyUser,
    acceptOrRejectExtension
  );

  orderRouter.patch(
    `${BASE_PATH}/:orderId/offer`,
    verifyUserInReq,
    verifyUser,
    gigOffer
  );

  return orderRouter;
};
