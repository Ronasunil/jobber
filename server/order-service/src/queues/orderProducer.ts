import { config } from "@order/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Channel } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Order service",
  "info"
);

export const publishDirectMessage = async function (
  channel: Channel,
  exchangeName: string,
  routingKey: string,
  msg: string,
  log: string
) {
  try {
    await channel.assertExchange(exchangeName, "direct", {
      durable: true,
      autoDelete: false,
    });

    channel.publish(exchangeName, routingKey, Buffer.from(msg));
    logger.info(log);
  } catch (err) {
    logger.info(
      "Error publish msg to queue publishDirectMessage(): order service"
    );

    logger.error(err);
  }
};
