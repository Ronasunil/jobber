import { config } from "@gateway/Config";
import { username } from "@gateway/controllers/user/buyer";
import { gatewayCache } from "@gateway/server";
import { winstonLogger } from "@ronasunil/jobber-shared";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Gateway service",
  "info"
);

export const addOnlineUsersCache = async function (username: string) {
  const pipeline = gatewayCache.pipeline();
  try {
    pipeline.hset("online-users", username, 1);
    pipeline.sadd("online-users-set", username);
    await pipeline.exec();
  } catch (err) {
    logger.info(`Error adding username`);
    logger.error(err);
  }
};

export const removeOnlineUsersCache = async function (
  username: string
): Promise<string[] | undefined> {
  const pipeline = gatewayCache.pipeline();
  try {
    pipeline.hdel("online-users", username);
    pipeline.srem("online-users-set", username);
    await pipeline.exec();
    const onlineUsers = await getOnlineUsersCache();
    return onlineUsers;
  } catch (err) {
    logger.info(`Error removing username`);
    logger.error(err);
  }
};

export const getOnlineUsersCache = async function () {
  try {
    const usernames = await gatewayCache.smembers("online-users-set");
    return usernames;
  } catch (err) {
    logger.info(`Error getting usernames`);
    logger.error(err);
  }
};
