import { config } from "@chat/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import amqp, { Channel, Connection } from "amqplib";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Chat service",
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
    logger.info("Successfully connected to rabbitmq chat service");
    closeConnection(channel, connection);
    return channel;
  } catch (err) {
    console.log(err);
    logger.info("Error connecting to rabbitmq... chat service");
    logger.error(err);
  }
};
