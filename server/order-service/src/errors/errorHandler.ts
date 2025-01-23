import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "@ronasunil/jobber-shared";

export const handleInvalidRoute = function (req: Request, res: Response) {
  const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  res
    .status(httpStatus.NOT_FOUND)
    .json({ message: `The requested url:${url} not found` });
};

export const handleError = function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.formatError());
    return;
  }
  console.log("Order service", err);
  res
    .status(520)
    .json({ status: "Error", message: "Unknown error", statusCode: 520 });
};
