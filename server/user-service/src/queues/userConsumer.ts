import { RabbitUserPayload } from "@ronasunil/jobber-shared";
import {
  addItemToPurchasedGigs,
  createBuyer,
} from "@user/services/buyerService";
import {
  addSellerReview,
  cancelJob,
  sellerJobCompleted,
  updateJobOffers,
  updateOngoingJob,
  updateTotalGigs,
} from "@user/services/sellerService";
import { Channel, ConsumeMessage } from "amqplib";

export const userBuyerCreateConsumer = async function (channel: Channel) {
  const exchangeKey = "buyer-create";
  const routingKey = "create";
  const queueName = "buyer-creation-queue";

  await channel.assertExchange(exchangeKey, "direct", {
    durable: true,
    autoDelete: false,
  });

  const queue = await channel.assertQueue(queueName, {
    durable: true,
    autoDelete: false,
  });

  await channel.bindQueue(queue.queue, exchangeKey, routingKey);
  channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
    if (!msg?.content) return;
    const data = JSON.parse(msg.content.toString()) as RabbitUserPayload;
    await createBuyer(data);
    channel.ack(msg);
  });
};

export const sellerJobConsumer = async function (channel: Channel) {
  const exchangeKey = "seller-job-lifecycle";

  const assignedRoutingKey = "job-assigned";
  const assignedQueue = "seller-job-assigned-queue";

  const completedRoutingKey = "job-completed";
  const completedQueue = "seller-job-completed-queue";

  await channel.assertExchange(exchangeKey, "direct", {
    durable: true,
    autoDelete: false,
  });

  // queue for buyer assigned task,  updating gigs count, cancelling order
  const q1 = await channel.assertQueue(assignedQueue, {
    durable: true,
    autoDelete: false,
  });

  // queue for when seller completed task
  const q2 = await channel.assertQueue(completedQueue, {
    durable: true,
    autoDelete: false,
  });

  await channel.bindQueue(q1.queue, exchangeKey, assignedRoutingKey);
  await channel.bindQueue(q2.queue, exchangeKey, completedRoutingKey);

  channel.consume(q1.queue, async (msg: ConsumeMessage | null) => {
    if (!msg?.content) return;
    const data = JSON.parse(msg.content.toString());

    if (data.type === "assign-order") {
      const { sellerId, count } = data as { sellerId: string; count: number };
      await updateJobOffers(sellerId, count);
    }

    if (data.type === "approve-order") {
      const { sellerId, count, buyerId, item } = data as {
        sellerId: string;
        count: number;
        buyerId: string;
        item: string;
      };
      await updateOngoingJob(sellerId, count);
      await addItemToPurchasedGigs(buyerId, item);
    }
    if (data.type === "update-gig-count") {
      const { count, sellerId } = data as { count: number; sellerId: string };
      await updateTotalGigs(sellerId, count);
    }
    if (data.type === "cancel-order") {
      const { sellerId } = data as { sellerId: string };
      await cancelJob(sellerId);
    }

    channel.ack(msg);
  });

  channel.consume(q2.queue, async (msg: ConsumeMessage | null) => {
    if (!msg?.content) return;
    const {
      sellerId,
      completedJobs,
      ongoingJobs,
      recentDelivery,
      totalEarning,
    } = JSON.parse(msg.content.toString()) as {
      sellerId: string;
      ongoingJobs: number;
      completedJobs: number;
      recentDelivery: Date;
      totalEarning: number;
    };

    await sellerJobCompleted(sellerId, {
      completedJobs,
      ongoingJobs,
      recentDelivery,
      totalEarning,
    });

    channel.ack(msg);
  });
};

export const ratingsConsumer = async function (channel: Channel) {
  const exchangeKey = "seller-review";
  const routingKey = "add";
  const queueName = "sellere-review";

  await channel.assertExchange(exchangeKey, "direct", {
    durable: true,
    autoDelete: false,
  });

  const queue = await channel.assertQueue(queueName, {
    durable: true,
    autoDelete: false,
  });

  await channel.bindQueue(queue.queue, exchangeKey, routingKey);

  channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
    if (!msg?.content) return;
    const { ratingCount, sellerId } = JSON.parse(msg.content.toString()) as {
      sellerId: string;
      ratingCount: number;
    };

    await addSellerReview(sellerId, ratingCount);
  });
};
