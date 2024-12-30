import { client, createIndex, searchGigById } from "@auth/elasticsearch";
import { GigAttrs } from "@auth/interfaces/gigInterface";
import {
  QueryDslQueryContainer,
  SearchTotalHits,
} from "@elastic/elasticsearch/lib/api/types";

export const setupIndex = async function (indexName: string) {
  await createIndex(indexName);
};

export const getGigById = async function (
  index: string,
  id: string
): Promise<GigAttrs | undefined> {
  return await searchGigById(index, id);
};

export const searchGig = async function (
  query: string,
  options: { min?: number; max?: number; from?: number; size?: number } = {
    from: 0,
    size: 10,
  }
): Promise<{
  total: number | SearchTotalHits | undefined;
  gigs: GigAttrs;
}> {
  const queryList: QueryDslQueryContainer[] = [
    {
      query_string: {
        fields: [
          "tags",
          "subCategories",
          "description",
          "title",
          "subCategories",
          "username",
        ],
        query: `*${query}*`,
      },
    },
  ];

  if (options.min && options.max)
    queryList.push({
      range: { price: { gte: options.min, lte: options.max } },
    });

  const result = await client.search({
    index: "gigs",
    query: { bool: { must: queryList } },
    from: options.from,
    size: options.size,
  });

  return {
    total: result.hits.total,
    gigs: result.hits.hits as unknown as GigAttrs,
  };
};
