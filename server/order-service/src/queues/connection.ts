import { config } from "@order/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import amqp, { Channel } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "App-notification service",
  "info"
);

export const connectToRabbitmq = async function (): Promise<
  Channel | undefined
> {
  try {
    const connection = await amqp.connect(config.RABBITMQ_ENDPOINT!);
    const channel = await connection.createChannel();
    logger.info("Successfully connected to rabbitmq");
    return channel;
  } catch (err) {
    logger.info("Error connecting to rabbitmq");
    logger.error(err);
  }
};
