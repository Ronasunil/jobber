import { config } from "@notifications/config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { Channel, connect, Connection } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Notification service",
  "info"
);

const closeConnection = function (channel: Channel, connection: Connection) {
  process.on("SIGINT", () => {
    channel.close();
    connection.close();
  });
};

export const rabbitmqConnection = async function (): Promise<
  Channel | undefined
> {
  try {
    console.log(config.RABBITMQ_ENDPOINT);
    const connection = await connect(config.RABBITMQ_ENDPOINT!);
    const channel = await connection.createChannel();

    logger.info("Rabbitmq successfully connected");
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    logger.error(`Can't connect to rabbitmq:rabbitmqConnection()`, error);
  }
};
