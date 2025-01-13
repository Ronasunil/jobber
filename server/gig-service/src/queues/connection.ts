import amqp, { Channel, Connection } from "amqplib";

import { config } from "@gig/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gig service",
  "info"
);

const closeConnection = function (channel: Channel, connection: Connection) {
  process.on("SIGINT", async () => {
    await channel.close();
    await connection.close();
  });
};

export const connectToRabbitmq = async function (): Promise<
  Channel | undefined
> {
  try {
    const connection = await amqp.connect(config.RABBITMQ_ENDPOINT!);
    const channel = await connection.createChannel();
    closeConnection(channel, connection);
    logger.info("Succesfully connected to rabbitmq gig service");
    return channel;
  } catch (err) {
    logger.info("Error connecting to rabbitmq...");
    logger.error(err);
    return undefined;
  }
};
