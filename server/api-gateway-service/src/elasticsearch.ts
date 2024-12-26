import { Client } from "@elastic/elasticsearch";
import { config } from "@gateway/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "gateway service",
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
        `successfully connected to elasticsearch with health status of ${health.status}`
      );
    } catch (err) {
      if (err instanceof Error) logger.error(err.message, err);
      else logger.error("Unknown error", err);
    }
  }
};
