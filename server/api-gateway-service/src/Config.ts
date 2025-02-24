import { BadRequest } from "@ronasunil/jobber-shared";
import dotenv from "dotenv";
import path from "path";

class Config {
  public PORT: number | undefined;
  public ELASTIC_SEARCH_ENDPOINT: string | undefined;
  public NODE_ENV: string | undefined;
  public COOKIE_SECRET: string | undefined;
  public CLIENT_URL: string | undefined;
  public API_GATEWAY_HEADER: string | undefined;
  public JWT_SECRET: string | undefined;
  public AUTH_SERVICE_URL: string | undefined;
  public USER_SERVICE_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public GIG_SERVICE_URL: string | undefined;
  public CHAT_SERVICE_URL: string | undefined;
  public CHAT_WS_URL: string | undefined;
  public APP_NOTIFICATION_SERVICE_URL: string | undefined;
  public APP_NOTIFICATION_WS_URL: string | undefined;
  public ORDER_SERVICE_URL: string | undefined;
  public REVIEW_SERVICE_URL: string | undefined;

  constructor() {
    this.loadEnv();
    this.PORT = +process.env.PORT!;
    this.ELASTIC_SEARCH_ENDPOINT = process.env.ELASTIC_SEARCH_ENDPOINT;
    this.NODE_ENV = process.env.NODE_ENV;
    this.COOKIE_SECRET = process.env.COOKIE_SECRET;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
    this.API_GATEWAY_HEADER = process.env.API_GATEWAY_HEADER;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.USER_SERVICE_URL = process.env.USER_SERVICE_URL;
    this.REDIS_HOST = process.env.REDIS_HOST;
    this.GIG_SERVICE_URL = process.env.GIG_SERVICE_URL;
    this.CHAT_SERVICE_URL = process.env.CHAT_SERVICE_URL;
    this.CHAT_WS_URL = process.env.CHAT_WS_URL;
    this.APP_NOTIFICATION_SERVICE_URL =
      process.env.APP_NOTIFICATION_SERVICE_URL;
    this.APP_NOTIFICATION_WS_URL = process.env.APP_NOTIFICATION_WS_URL;
    this.ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;
    this.REVIEW_SERVICE_URL = process.env.REVIEW_SERVICE_URL;
    this.validateEnv();
  }

  private loadEnv() {
    dotenv.config({ path: path.join(__dirname, "config.env") });
  }

  private validateEnv() {
    for (let [key, value] of Object.entries(this)) {
      if (!value)
        throw new BadRequest(
          `Value of ${key} is ${value}`,
          "api-gateway config validateEnv()"
        );
    }
  }
}

export const config = new Config();
