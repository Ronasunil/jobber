import { intent, order } from "@order/controllers/create";
import {
  orderBuyers,
  orderById,
  sellerAcceptedGigs,
} from "@order/controllers/get";
import {
  acceptOrRejectExtension,
  deliveryExtension,
  gigOffer,
  orderApproval,
  orderCancellation,
  orderDelivered,
} from "@order/controllers/update";
import {
  approvalStatusSchema,
  extensionSchema,
  intentSchema,
  offerGigSchema,
  orderCreationSchema,
} from "@order/schemas/orderSchema";
import { gatewayMiddleware, validateJoi } from "@ronasunil/jobber-shared";
import { Router } from "express";

export const orderRoutes = function (): Router {
  const orderRouter = Router();
  const basePath = "api/v1/orders";

  // GET
  orderRouter.get(`${basePath}/:orderId`, gatewayMiddleware, orderById);
  orderRouter.get(
    `${basePath}/sellers/:sellerId`,
    gatewayMiddleware,
    sellerAcceptedGigs
  );
  orderRouter.get(
    `${basePath}/buyers/:buyerId`,
    gatewayMiddleware,
    orderBuyers
  );

  // POST
  orderRouter.post(
    `${basePath}`,
    gatewayMiddleware,
    validateJoi(orderCreationSchema),
    order
  );

  orderRouter.post(
    `${basePath}/intent`,
    gatewayMiddleware,
    validateJoi(intentSchema),
    intent
  );

  // PATCH
  orderRouter.patch(
    `${basePath}/:orderId/cancel`,
    gatewayMiddleware,
    orderCancellation
  );

  orderRouter.patch(`${basePath}/:orderId/approve`, orderApproval);
  orderRouter.patch(
    `${basePath}/:orderId/deliver`,
    gatewayMiddleware,
    orderDelivered
  );
  orderRouter.patch(
    `${basePath}/:orderId/delivery-extension`,
    gatewayMiddleware,
    validateJoi(extensionSchema),
    deliveryExtension
  );

  orderRouter.patch(
    `${basePath}/:orderId/approval`,
    gatewayMiddleware,
    validateJoi(approvalStatusSchema),
    acceptOrRejectExtension
  );

  orderRouter.patch(
    `${basePath}/:orderId/offer`,
    gatewayMiddleware,
    validateJoi(offerGigSchema),
    gigOffer
  );

  return orderRouter;
};
