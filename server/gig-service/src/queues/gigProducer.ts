import { config } from "@gig/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Channel } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gig service",
  "info"
);

export const publishDirectMessage = async function (
  channel: Channel,
  exchangeKey: string,
  routingkey: string,
  msg: string,
  log: string
) {
  try {
    await channel.assertExchange(exchangeKey, "direct", {
      durable: true,
      autoDelete: false,
    });
    channel.publish(exchangeKey, routingkey, Buffer.from(msg));
    logger.info(log);
  } catch (err) {
    logger.info("Error publish msg publishDirectMessage:() gig service");
    logger.error(err);
  }
};
