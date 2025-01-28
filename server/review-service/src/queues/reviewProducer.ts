import { config } from "@review/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Channel } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Review service",
  "info"
);

export const publishDirectMessage = async function (
  channel: Channel,
  exchangeKey: string,
  routingKey: string,
  msg: string,
  log: string
) {
  try {
    await channel.assertExchange(exchangeKey, "direct", {
      autoDelete: false,
      durable: true,
    });

    channel.publish(exchangeKey, routingKey, Buffer.from(msg));
    logger.info(log);
  } catch (err) {
    logger.info("Error publishing review event");
    logger.error(err);
  }
};
