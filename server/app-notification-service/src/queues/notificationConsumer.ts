import { config } from "@app-notification/Config";

import { createNotification } from "@app-notification/services/notificationService";
import {
  NotificationCreationAttr,
  winstonLogger,
} from "@ronasunil/jobber-shared";
import { Channel, ConsumeMessage } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "App-notification",
  "info"
);

export const notificationConsumer = async function (channel: Channel) {
  const exchangeName = "app-notification";
  const routingKey = "notification";
  const queueName = "app-notification-queue";

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
      const data = JSON.parse(
        msg.content.toString()
      ) as NotificationCreationAttr;

      await createNotification(data);
      channel.ack(msg);
    });
  } catch (err) {
    logger.info("Error creating queue");
    logger.error(err);
  }
};
