import { OrderDoc, PopulatedOrder } from "@order/interfaces/orderInterface";
import { OrderModel } from "@order/models/orderModel";
import { publishDirectMessage } from "@order/queues/orderProducer";
import { orderChannel } from "@order/server";
import { NotificationCreationAttr } from "@ronasunil/jobber-shared";

export const sendNotification = async function (
  notification: NotificationCreationAttr
) {
  const exchangeName = "app-notification";
  const routingKey = "notification";

  await publishDirectMessage(
    orderChannel,
    exchangeName,
    routingKey,
    JSON.stringify(notification),
    "Successfully published notification event"
  );
};

export const populateOrder = async (
  orderId: string
): Promise<PopulatedOrder | null> => {
  return await OrderModel.findById(orderId)
    .populate<{ sellerId: { profilePhoto: string } }>(
      "sellerId",
      "profilePhoto"
    )
    .populate<{ buyerId: { profilePhoto: string } }>("buyerId", "profilePhoto");
};

export const prepareNotificationData = function (
  populatedOrder: PopulatedOrder,
  order: OrderDoc,
  msg: string,
  type: "buyer-sending" | "seller-sending"
): NotificationCreationAttr {
  const notification: NotificationCreationAttr = {
    message: msg,
    receiverProfilePhoto:
      type === "buyer-sending"
        ? populatedOrder.sellerId.profilePhoto
        : populatedOrder.buyerId.profilePhoto,
    receiverUsername:
      type === "buyer-sending"
        ? populatedOrder.sellerUsername
        : populatedOrder.receiverUsername,
    senderProfilePhoto:
      type === "buyer-sending"
        ? populatedOrder.buyerId.profilePhoto
        : populatedOrder.sellerId.profilePhoto,
    senderUsername:
      type === "buyer-sending"
        ? populatedOrder.receiverUsername
        : populatedOrder.sellerUsername,
    userFrom:
      type === "buyer-sending" ? `${order.buyerId}` : `${order.sellerId}`,
    userTo: type === "buyer-sending" ? `${order.sellerId}` : `${order.buyerId}`,
  };

  return notification;
};

export const checkOrderExist = async function (
  orderId: string
): Promise<OrderDoc | null> {
  const order = await OrderModel.findById(orderId);
  return order;
};
