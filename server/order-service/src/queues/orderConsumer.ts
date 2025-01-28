import { config } from "@order/Config";
import { OrderReviewRating, winstonLogger } from "@ronasunil/jobber-shared";
import { Channel, ConsumeMessage } from "amqplib";
import { addRating } from "@order/services/orderService";
import { order } from "@order/controllers/create";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "App-notification",
  "info"
);

export const notificationConsumer = async function (channel: Channel) {
  const exchangeName = "order-review";
  const routingKey = "review";
  const queueName = "order-review-queue";

  try {
    await channel.assertExchange(exchangeName, "direct", {
      durable: true,
      autoDelete: false,
    });

    const queue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false,
    });

    await channel.bindQueue(queue.queue, exchangeName, routingKey);

    await channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
      if (!msg?.content) return;
      const data = JSON.parse(msg.content.toString()) as OrderReviewRating;

      await addRating(
        `${data.orderId}`,
        {
          review: data.testimonials.review,
          rating: data.testimonials.rating,
        },
        data.orderReviewType
      );

      channel.ack(msg);
    });
  } catch (err) {
    logger.info("Error creating queue");
    logger.error(err);
  }
};
