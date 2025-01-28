import {
  checkOrderExist,
  populateOrder,
  prepareNotificationData,
  sendNotification,
} from "@order/utils/helper";
import {
  OrderDelivery,
  OrderDoc,
  PopulatedOrder,
} from "@order/interfaces/orderInterface";
import { OrderModel } from "@order/models/orderModel";
import { publishDirectMessage } from "@order/queues/orderProducer";
import { orderChannel } from "@order/server";
import {
  BadRequest,
  cloudinaryUploader,
  ExtensionRequest,
  OfferRequest,
  OrderCreationAttr,
} from "@ronasunil/jobber-shared";
import { createRefund } from "@order/stripe";
import Stripe from "stripe";

export const createOrder = async function (
  data: OrderCreationAttr
): Promise<OrderDoc> {
  const order = await OrderModel.create(data);

  const populatedOrder = await populateOrder(`${order._id}`);

  if (!populatedOrder)
    throw new BadRequest(
      `order regarding this id:${order._id}`,
      "createOrder(): order service"
    );

  const msg = JSON.stringify({
    type: "assign-order",
    sellerId: order.sellerId,
    count: 1,
  });

  //   publishing message to increment the count of seller's ongoingJobs
  await publishDirectMessage(
    orderChannel,
    "seller-job-lifecycle",
    "job-assigned",
    msg,
    "Succesfully emited order create event for sellers"
  );

  //   sending notification to seller about the order
  const notification = prepareNotificationData(
    populatedOrder,
    order,
    `${order.receiverUsername} placed an order`,
    "buyer-sending"
  );

  await sendNotification(notification);

  return order;
};

export const cancelOrder = async function (
  orderId: string,
  stripe: Stripe
): Promise<OrderDoc> {
  const orderExists = await checkOrderExist(orderId);

  if (!orderExists)
    throw new BadRequest(
      `Order regarding this particular id:${orderId} not found`,
      "cancelOrder(): order service"
    );

  const [order, populatedOrder] = await Promise.all([
    OrderModel.findByIdAndUpdate(
      orderId,
      { status: "Rejected", statusChangeTime: new Date() },
      { new: true, runValidators: true }
    ) as Promise<OrderDoc>,

    populateOrder(orderId) as Promise<PopulatedOrder>,
  ]);

  // publishing event to decrement jobOffers and increment cancelledJob of a seller
  const msg = JSON.stringify({
    type: "cancel-order",
    sellerId: order.sellerId,
  });

  await publishDirectMessage(
    orderChannel,
    "seller-job-lifecycle",
    "job-assigned",
    msg,
    "successfully emitted order cancelled event"
  );

  // send notification to buyer
  const notification = prepareNotificationData(
    populatedOrder,
    order,
    `Your gig has been rejected by ${order.sellerUsername}`,
    "seller-sending"
  );

  await sendNotification(notification);

  await createRefund(stripe, order.paymentIntent);
  return order;
};

export const approveOrder = async function (
  orderId: string
): Promise<OrderDoc> {
  const orderExists = await checkOrderExist(orderId);

  if (!orderExists)
    throw new BadRequest(
      `Order regarding this particular id:${orderId} not found`,
      "approveOrder(): order service"
    );

  const [order, populatedOrder] = await Promise.all([
    OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: "Accepted",
        statusChangeTime: new Date(),
      },
      { new: true, runValidators: true }
    ) as Promise<OrderDoc>,
    populateOrder(orderId) as Promise<PopulatedOrder>,
  ]);

  const msg = JSON.stringify({
    type: "approve-order",
    sellerId: order.sellerId,
    count: 1,
    buyerId: order.buyerId,
    item: order._id,
  });

  // publishing message to add accepted gig id to buyer's purchasedGigs
  await publishDirectMessage(
    orderChannel,
    "seller-job-lifecycle",
    "job-assigned",
    msg,
    "successfully  emitted order approved emit"
  );

  // sending notification to buyer
  const notification = prepareNotificationData(
    populatedOrder,
    order,
    `Your gig has been accepted by ${order.sellerUsername}`,
    "seller-sending"
  );

  await sendNotification(notification);
  return order;
};

export const deliverOrder = async function (orderId: string, file: string) {
  const orderExists = await checkOrderExist(orderId);

  if (!orderExists)
    throw new BadRequest(
      `Order regarding this particular id:${orderId} not found`,
      "deliverOrder(): order service"
    );

  const result = await cloudinaryUploader.uploadImage(file);
  if (!result?.public_id)
    throw new BadRequest(
      "Error uploading file.try again",
      "deliverOrder(): order service"
    );

  const orderDelivery: OrderDelivery = {
    file: result.secure_url,
    fileName: result.original_filename,
    fileSize: `${result.bytes}`,
    fileType: result.resource_type,
  };

  const [order, populatedOrder] = await Promise.all([
    OrderModel.findByIdAndUpdate(
      orderId,
      {
        status: "Delivered",
        statusChangeTime: new Date(),
        $push: { orderDelivery },
      },
      { new: true, runValidators: true }
    ) as Promise<OrderDoc>,
    populateOrder(orderId) as Promise<PopulatedOrder>,
  ]);

  // publishing message to update sellers attributes
  const msg = JSON.stringify({
    sellerId: order.sellerId,
    completedJobs: 1,
    ongoingJobs: -1,
    recentDelivery: new Date(),
    totalEarning: order.amount,
  });

  await publishDirectMessage(
    orderChannel,
    "seller-job-lifecycle",
    "job-completed",
    msg,
    "successfully emitted order delivered event"
  );

  // send notification
  const notification = prepareNotificationData(
    populatedOrder,
    order,
    `Your gig has been completed`,
    "seller-sending"
  );

  await sendNotification(notification);

  return order;
};

export const deliveryExtensionRequest = async function (
  orderId: string,
  extensionRequest: ExtensionRequest
): Promise<OrderDoc> {
  const orderExists = await checkOrderExist(orderId);

  if (!orderExists)
    throw new BadRequest(
      `Order regarding this particular id:${orderId} not found`,
      "deliveryExtensionRequest(): order service"
    );

  const [order, populatedOrder] = await Promise.all([
    OrderModel.findByIdAndUpdate(
      orderId,
      {
        [`extensionRequest.oldDeliveryDate`]: extensionRequest.oldDeliveryDate,
        [`extensionRequest.newDeliveryDate`]: extensionRequest.newDeliveryDate,
        [`extensionRequest.reason`]: extensionRequest.reason,
        rejected: extensionRequest.rejected,
        accepted: extensionRequest.accepted,
      },
      { new: true, runValidators: true }
    ) as Promise<OrderDoc>,
    populateOrder(orderId) as Promise<PopulatedOrder>,
  ]);

  // send notification to buyer about extension request
  const notification = prepareNotificationData(
    populatedOrder,
    order,
    `Extension request has been mad by seller ${order.sellerUsername}`,
    "seller-sending"
  );

  await sendNotification(notification);

  return order;
};

export const extensionRequestStatus = async function (
  orderId: string,
  status: { accepted: boolean; rejected: boolean }
): Promise<OrderDoc> {
  const orderExists = await checkOrderExist(orderId);

  if (!orderExists)
    throw new BadRequest(
      `Order regarding this particular id:${orderId} not found`,
      "requestExtension(): order service"
    );

  const [order, populatedOrder] = await Promise.all([
    OrderModel.findByIdAndUpdate(
      orderId,
      {
        [`extensionRequest.accepted`]: status.accepted,
        [`extensionRequest.rejected`]: status.rejected,
      },
      { new: true, runValidators: true }
    ) as Promise<OrderDoc>,
    populateOrder(orderId) as Promise<PopulatedOrder>,
  ]);

  //  send notification regaridn extension accepted or rejected
  const message = status.accepted
    ? `Your extension request has been accepted by the buyer ${order.receiverUsername}`
    : `Your extension request has been rejected by the buyer ${order.receiverUsername}`;
  const notification = prepareNotificationData(
    populatedOrder,
    order,
    message,
    "buyer-sending"
  );

  await sendNotification(notification);
  return order;
};

export const offerGig = async function (
  orderId: string,
  offer: OfferRequest
): Promise<OrderDoc> {
  const orderExists = await checkOrderExist(orderId);

  if (!orderExists)
    throw new BadRequest(
      `Order regarding this particular id:${orderId} not found`,
      "offerGig(): order service"
    );

  return (await OrderModel.findByIdAndUpdate(
    orderId,
    { offer },
    { new: true, runValidators: true }
  )) as OrderDoc;
};

export const getOrderById = async function (
  orderId: string
): Promise<OrderDoc> {
  const orderExists = await checkOrderExist(orderId);

  if (!orderExists)
    throw new BadRequest(
      `Order regarding this particular id:${orderId} not found`,
      "orderByid(): order service"
    );

  return orderExists;
};

export const getBuyerOrders = async function (
  buyerId: string
): Promise<OrderDoc[] | null> {
  const orders = await OrderModel.find({ buyerId });
  return orders;
};

export const getSellerAcceptedOrders = async function (
  sellerId: string
): Promise<OrderDoc[] | null> {
  const orders = await OrderModel.find({ sellerId });
  return orders;
};

export const addRating = async function (
  orderId: string,
  testimonials: { review: string; rating: number },
  type: "seller" | "buyer"
) {
  const orderExists = await checkOrderExist(orderId);

  if (!orderExists)
    throw new BadRequest(
      `Order regarding this particular id:${orderId} not found`,
      "addRating(): order service"
    );

  await OrderModel.findByIdAndUpdate(
    orderId,
    type === "seller"
      ? {
          buyerRating: {
            rating: testimonials.rating,
            review: testimonials.review,
          },
        }
      : {
          sellerRating: {
            rating: testimonials.rating,
            review: testimonials.review,
          },
        }
  );
};
