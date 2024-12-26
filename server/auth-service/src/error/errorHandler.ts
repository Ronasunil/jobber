import { CustomError, winstonLogger } from "@ronasunil/jobber-shared";
import { NextFunction, Request, Response } from "express";

import { config } from "@auth/Config";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Auth service",
  "info"
);

export const handleError = function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CustomError) {
    console.log(err.formatError());
    res.status(err.statusCode).json(err.formatError());
    return;
  }
  console.log("Auth service", err);
  res
    .status(520)
    .json({ status: "Error", message: "Unknown error", statusCode: 520 });
};
