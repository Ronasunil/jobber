import { Client } from "@elastic/elasticsearch";
import { config } from "@auth/Config";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { GigAttrs } from "./interfaces/gigInterface";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
  "info"
);

const connectToElasticsearch = function (): Client {
  const client = new Client({
    node: config.ELASTIC_SEARCH_ENDPOINT,
  });

  return client;
};

export const client = connectToElasticsearch();

export const retryElasticSearchConnection = async function () {
  let isConnected = false;

  while (!isConnected) {
    try {
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

const checkIndexExist = async function (indexName: string): Promise<boolean> {
  const indexFound = await client.indices.exists({ index: indexName });
  return indexFound;
};

export const createIndex = async function (indexName: string) {
  try {
    const indexFound = await checkIndexExist(indexName);
    if (indexFound) {
      {
        logger.info(`Index:${indexName} exist`);
        return;
      }
    }
    await client.indices.create({ index: indexName });
    await client.indices.refresh({ index: indexName });
  } catch (err) {
    logger.error(`Can't create index:${indexName}`, err);
  }
};

export const searchGigById = async function (index: string, id: string) {
  try {
    const gig = await client.get({ index, id });
    return gig._source as GigAttrs;
  } catch (err) {
    logger.error("Failed getting gig from searchGigById(): authservice", err);
  }
};
