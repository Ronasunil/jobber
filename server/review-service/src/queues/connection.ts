import { config } from "@review/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import amqp, { Channel, Connection } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Review service",
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
    return channel;
  } catch (err) {
    logger.info("Error connecting to rabbitmq...");
    logger.error(err);
  }
};
