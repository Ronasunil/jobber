import { config } from "@auth/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Channel } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "auth service",
  "info"
);

export const publishDirectMessage = async function (
  channel: Channel,
  exchangeKey: string,
  routingKey: string,
  message: string,
  log: string
) {
  try {
    await channel.assertExchange(exchangeKey, "direct");
    channel.publish(exchangeKey, routingKey, Buffer.from(message));
    logger.info(log);
  } catch (err) {
    logger.error("Failed to publish message from publishDirectMessage():");
    logger.error(err);
  }
};
