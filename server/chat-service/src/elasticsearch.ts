import { Client } from "@elastic/elasticsearch";
import { config } from "@chat/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Chat service",
  "info"
);

const connectToElasticsearch = function (): Client {
  const client = new Client({
    node: config.ELASTIC_SEARCH_ENDPOINT,
  });

  return client;
};

export const retryElasticSearchConnection = async function () {
  let isConnected = false;
  const client = connectToElasticsearch();

  while (!isConnected) {
    try {
      const health = await client.cluster.health({});
      logger.info(
        `Successfully connected to elastic search with health status of ${health.status}`
      );
      isConnected = true;
    } catch (err) {
      logger.info("error connecting to elasticsearch...");
      logger.error(err);
    }
  }
};
