import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { winstonLogger } from "@ronasunil/jobber-shared";

import { config } from "@gateway/Config";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "gateway service",
  "info"
);

export const handleInvalidRoute = function (req: Request, res: Response) {
  const url = `${req.protocol}://${req.get("host")}:${req.originalUrl}`;

  res
    .status(httpStatus.NOT_FOUND)
    .json({ message: `The request url:${url} not found` });
};

export const handleError = function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err.message);
  res.status(400).json({ status: "error", message: err.message });
};
