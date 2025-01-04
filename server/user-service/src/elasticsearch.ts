import { Client } from "@elastic/elasticsearch";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { config } from "@user/Config";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "User service",
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
      if (err instanceof Error)
        logger.error(`${err.message} user service`, err);
      else logger.error("Unknown error", err);
    }
  }
};
