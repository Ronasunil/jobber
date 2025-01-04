import amqp, { Channel, Connection } from "amqplib";
import { config } from "@user/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "User-service",
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
    const connection = await amqp.connect(config.RABBITMQ_ENDPOINT!);
    const channel = await connection.createChannel();
    logger.info("Successfully connected to rabbitmq user-service");
    closeConnection(channel, connection);
    return channel;
  } catch (err) {
    logger.error(
      "Connection failed rabbitmq connectToRabbitmq(): user service"
    );
  }
};
