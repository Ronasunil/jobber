import { winstonLogger } from "@ronasunil/jobber-shared";
import { config } from "@user/Config";
import { Channel } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
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
      durable: true,
      autoDelete: false,
    });

    channel.publish(exchangeKey, routingKey, Buffer.from(msg));
    logger.info(log);
  } catch (err) {
    logger.error(
      "Failed to publish message from publishDirectMessage(): auth service"
    );
    logger.error(err);
  }
};
