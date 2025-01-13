import { config } from "@gig/Config";
import { GigAttrs, GigHit } from "@gig/interfaces/gigInterface";
import { gigCache } from "@gig/server";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gig service",
  "info"
);

export const saveGigCategoryCache = async function (
  key: string,
  gig: GigHit[]
) {
  try {
    await gigCache.set(key, JSON.stringify(gig));
  } catch (err) {
    logger.info("Error adding item to cache");
    logger.error(err);
  }
};

export const getGigCategoryCache = async function (
  key: string
): Promise<GigHit[] | undefined> {
  try {
    const result = await gigCache.get(key);
    if (!result) return undefined;
    return JSON.parse(result) as GigHit[];
  } catch (err) {
    logger.info("Error reteriving item from cache");
    logger.error(err);
  }
};
