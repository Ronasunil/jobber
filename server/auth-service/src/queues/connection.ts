import { Channel, connect, Connection } from "amqplib";

import { config } from "@auth/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
  "info"
);

const closeConnection = function (channel: Channel, connection: Connection) {
  process.on("SIGINT", () => {
    channel.close();
    connection.close();
  });
};

export const connectToRabbitmq = async function (): Promise<
  Channel | undefined
> {
  try {
    const connection = await connect(config.RABBITMQ_ENDPOINT!);
    const channel = await connection.createChannel();
    logger.info("Successfully connected to rabbitmq authservice");
    closeConnection(channel, connection);
    return channel;
  } catch (err) {
    if (err instanceof Error) logger.error(err.message, err);
    else logger.error("Unknown error", err);
  }
};
