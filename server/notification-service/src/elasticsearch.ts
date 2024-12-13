import { Client } from "@elastic/elasticsearch";
import { config } from "@notifications/config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "notificationService",
  "info"
);

const connectToElasticsearch = function (): Client {
  const client = new Client({
    node: config.ELASTIC_SEARCH_ENDPOINT,
  });

  return client;
};

export const retryElasticSearchConnection = async function (): Promise<void> {
  let isConnected = false;

  while (!isConnected) {
    try {
      const client = connectToElasticsearch();

      const health = await client.cluster.health({});

      logger.info(
        `Successfully connected to elastic search with health status of ${health.status}`
      );
      isConnected = true;
    } catch (err) {
      if (err instanceof Error) logger.error(err.message, err);
      else logger.error("Unknown error", err);
    }
  }
};
