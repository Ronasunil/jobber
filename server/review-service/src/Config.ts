import path from "path";
import dotenv from "dotenv";
import { BadRequest } from "@ronasunil/jobber-shared";

class Config {
  public PORT = 2006;
  public ELASTIC_SEARCH_ENDPOINT: string | undefined;
  public API_GATEWAY_ENDPOINT: string | undefined;
  public MYSQL_DB_ENDPOINT: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;
  constructor() {
    this.loadConfigPath();
    this.loadenv();
    this.validateConfig();
  }

  private loadenv() {
    this.PORT = +process.env.PORT!;
    this.API_GATEWAY_ENDPOINT = process.env.API_GATEWAY_ENDPOINT;
    this.ELASTIC_SEARCH_ENDPOINT = process.env.ELASTIC_SEARCH_ENDPOINT;
    this.MYSQL_DB_ENDPOINT = process.env.MYSQL_DB_ENDPOINT;
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT;
  }

  private loadConfigPath() {
    dotenv.config({ path: path.join(__dirname, "config.env") });
  }

  private validateConfig() {
    for (let [key, value] of Object.entries(this)) {
      if (!value)
        throw new BadRequest(
          `Invalid key:${key}`,
          "Review service  validateConfig():"
        );
    }
  }
}

export const config = new Config();
