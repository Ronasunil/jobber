import { Client } from "@elastic/elasticsearch";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { config } from "@order/Config";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Order service",
  "info"
);

const connectToElasticsearch = function (): Client {
  const client = new Client({
    node: config.ELASTIC_SEARCH_ENDPOINT!,
  });

  return client;
};

export const retryElasticSearchConnection = async function () {
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
      logger.info("Error connecting to elasticsearch");
      logger.error(err);
    }
  }
};
