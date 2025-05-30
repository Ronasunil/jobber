import { BadRequest } from "@ronasunil/jobber-shared";
import dotenv from "dotenv";
import path from "path";

class Config {
  public API_GATEWAY_ENDPOINT: string | undefined;
  public PORT: number | undefined;
  public ELASTIC_SEARCH_ENDPOINT: string | undefined;
  public MONGO_DB_ENDPOINT: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;

  constructor() {
    this.loadConfig();
    this.API_GATEWAY_ENDPOINT = process.env.API_GATEWAY_ENDPOINT;
    this.PORT = +process.env.PORT!;
    this.ELASTIC_SEARCH_ENDPOINT = process.env.ELASTIC_SEARCH_ENDPOINT;
    this.MONGO_DB_ENDPOINT = process.env.MONGO_DB_ENDPOINT;
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT;
    this.validateConfig();
  }

  private loadConfig() {
    dotenv.config({ path: path.join(__dirname, "config.env") });
  }

  private validateConfig() {
    for (let [key, value] of Object.entries(this)) {
      if (!value)
        throw new BadRequest(
          `${key} not found`,
          "validateConfig(): user service"
        );
    }
  }
}

export const config = new Config();
