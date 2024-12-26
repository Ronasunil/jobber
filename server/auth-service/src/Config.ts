import { BadRequest } from "@ronasunil/jobber-shared";
import dotenv from "dotenv";

import path from "path";

class Config {
  public PORT: number | undefined;
  public ELASTIC_SEARCH_ENDPOINT: string | undefined;
  public MYSQL_DB: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;
  public DEFAULT_PROFILE_IMG: string | undefined;
  public JWT_SECRET: string | undefined;
  public APP_ICON: string | undefined;
  public CLIENT_URL: string | undefined;
  public API_GATEWAY_ENDPOINT: string | undefined;

  constructor() {
    this.loadConfig();
    this.PORT = +process.env.PORT!;
    this.ELASTIC_SEARCH_ENDPOINT = process.env.ELASTIC_SEARCH_ENDPOINT;
    this.MYSQL_DB = process.env.MYSQL_DB;
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT;
    this.DEFAULT_PROFILE_IMG = process.env.DEFAULT_PROFILE_IMG;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.APP_ICON = process.env.APP_ICON;
    this.CLIENT_URL = process.env.CLIENT_URL;
    this.API_GATEWAY_ENDPOINT = process.env.API_GATEWAY_ENDPOINT;
    this.validateConfig();
  }

  private loadConfig() {
    dotenv.config({ path: path.join(__dirname, "config.env") });
  }

  private validateConfig() {
    for (let [key, value] of Object.entries(this)) {
      if (!value) {
        throw new BadRequest(`${key} not found in env file`, "config");
      }
    }
  }
}

export const config = new Config();
