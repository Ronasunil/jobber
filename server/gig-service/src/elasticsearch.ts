import { Client } from "@elastic/elasticsearch";
import { winstonLogger } from "@ronasunil/jobber-shared";
import { config } from "@gig/Config";
import {
  GigAttrs,
  GigDoc,
  GigHit,
  GigUpdateAttrs,
  GitRatingUpdateAttrs,
} from "./interfaces/gigInterface";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gig service",
  "info"
);

const connectToElasticsearch = function (): Client {
  const client = new Client({
    node: config.ELASTIC_SEARCH_ENDPOINT,
  });

  return client;
};

const client = connectToElasticsearch();

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

const checkIndexExist = async function (index: string): Promise<boolean> {
  const indexExist = await client.indices.exists({ index });
  return indexExist;
};

export const createIndex = async function (index: string) {
  try {
    console.log("lp");
    const indexExist = await checkIndexExist(index);
    if (indexExist) {
      logger.info(`Index:${index} exist`);
      return;
    }
    await client.indices.create({ index });
    logger.info(`created index:${index}`);
  } catch (err) {
    logger.info("Error creating index gig service");
    logger.error(err);
  }
};

export const getIndexData = async function (
  index: string,
  id: string
): Promise<GigAttrs | undefined> {
  try {
    const result = await client.get({ index, id });
    return result._source as GigAttrs;
  } catch (err) {
    logger.info("Error getting index data gig service");
    logger.error(err);
  }
};

export const createIndexData = async function (
  index: string,
  document: GigDoc
) {
  try {
    await client.index({
      index,
      id: document.id.toString(),
      document,
    });
    console.log("created...");
  } catch (err) {
    logger.info("Error adding data to index...");
    logger.error(err);
  }
};

export const updateIndexData = async function (
  index: string,
  id: string,
  document: GigUpdateAttrs
) {
  try {
    await client.update({ index, id, doc: document });
  } catch (err) {
    logger.info("Error getting index data gig service");
    logger.error(err);
  }
};

export const deleteIndexData = async function (index: string, id: string) {
  try {
    await client.delete({ index, id });
  } catch (err) {
    logger.info("Error deleting index data gig service");
    logger.error(err);
  }
};

export const getGigBySellerId = async function (
  sellerId: string
): Promise<GigHit[]> {
  const result = await client.search({
    index: "gigs",
    query: {
      bool: {
        must: {
          query_string: { fields: ["sellerId"], query: `*${sellerId}*` },
        },
      },
    },
  });

  return result.hits.hits as unknown as GigHit[];
};

export const getGigByActiveStatus = async function (
  sellerId: string,
  status: Boolean
): Promise<GigHit[]> {
  console.log(status, sellerId);
  const result = await client.search({
    index: "gigs",
    query: {
      bool: {
        must: [
          {
            query_string: {
              fields: ["sellerId"],
              query: `*${sellerId}*`,
            },
          },
          {
            term: { active: status },
          },
        ],
      },
    },
  });

  return result.hits.hits as unknown as GigHit[];
};

export const updateGigRatings = async function (
  index: string,
  data: GitRatingUpdateAttrs,
  ratingsKey: string
) {
  const { ratingsCount, gigId } = data;

  await client.update({
    index,
    id: gigId,
    script: {
      source: `
      ctx._source.ratingsCount += 1;
      ctx._source.ratingsSum += params.ratingsCount;
      ctx._source.ratingsCategories[params.ratingsKey].count += 1;
      ctx._source.ratingsCategories[params.ratingsKey].value = params.ratingsCount;
      if(ctx._source.ratingsSum && ctx._source.ratingsCount){
        ctx._source.rating +=  ctx._source.ratingsSum/ctx._source.ratingsCount
      }
      
    `,
      params: { ratingsCount, ratingsKey },
    },
  });
};

export const gigMoreLikeThis = async function (
  gigId: string
): Promise<GigHit[]> {
  const result = await client.search({
    size: 10,
    query: {
      bool: {
        must: [
          {
            more_like_this: {
              fields: [
                "title",
                "tags",
                "categories",
                "subCategories",
                "description",
                "basicDescription",
              ],

              like: [{ _index: "gigs", _id: gigId }],
            },
          },

          {
            term: { active: true },
          },
        ],
      },
    },
  });

  return result.hits.hits as unknown as GigHit[];
};

export const topRatedGigs = async function (): Promise<GigHit[]> {
  const result = await client.search({
    index: "gigs",
    query: {
      bool: {
        filter: [
          {
            range: {
              rating: { gte: 5 },
            },
          },

          { term: { active: true } },
        ],
      },
    },
  });

  return result.hits.hits as unknown as GigHit[];
};

export const gigByCategories = async function (
  categories: string
): Promise<GigHit[]> {
  const result = await client.search({
    index: "gigs",
    query: {
      bool: {
        must: [
          {
            query_string: {
              fields: ["categories"],
              query: `*${categories}*`,
            },
          },
          { term: { active: true } },
        ],
      },
    },
  });

  return result.hits.hits as unknown as GigHit[];
};
