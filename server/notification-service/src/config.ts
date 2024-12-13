import { BadRequest } from "@ronasunil/jobber-shared";
import dotenv from "dotenv";
import path from "path";
import { EmailLocals } from "./interfaces/emailInterface";

class Config {
  public APM_START: string | undefined;
  public ELASTIC_SEARCH_ENDPOINT: string | undefined;
  public RABBITMQ_ENDPOINT: string | undefined;
  public NODE_ENV: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_PASS: string | undefined;
  public SMTP_PORT: number | undefined;
  public HOST: string | undefined;
  public PORT: number | undefined;
  public APP_ICON: string | undefined;
  public CLIENT_URL: string | undefined;

  constructor() {
    this.loadConfig();

    this.APM_START = process.env.APM_START;
    this.ELASTIC_SEARCH_ENDPOINT = process.env.ELASTIC_SEARCH_ENDPOINT;
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT;
    this.NODE_ENV = process.env.NODE_ENV;
    this.SENDER_EMAIL = process.env.SENDER_EMAIL;
    this.SENDER_PASS = process.env.SENDER_PASS;
    this.SMTP_PORT = +process.env.SMTP_PORT!;
    this.HOST = process.env.HOST;
    this.PORT = +process.env.PORT!;
    this.APP_ICON = process.env.APP_ICON;
    this.CLIENT_URL = process.env.CLIENT_URL;

    // this.validateConfig();
  }

  private loadConfig() {
    dotenv.config({ path: path.join(__dirname, "config.env") });
  }

  validateConfig() {
    for (let [key, value] of Object.entries(this)) {
      if (!value) {
        throw new BadRequest(`${key} not found in env file`, "config");
      }
    }
  }
}

export const config = new Config();
