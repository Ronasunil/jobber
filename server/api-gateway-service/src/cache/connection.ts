import { config } from "@gateway/Config";
import Redis from "ioredis";

export const connectToRedis = function (): Redis {
  const client = new Redis(config.REDIS_HOST!);
  return client;
};
