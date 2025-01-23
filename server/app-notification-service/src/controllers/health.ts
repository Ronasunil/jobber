import { Request, Response } from "express";
import httpStatus from "http-status-codes";

export const health = function (req: Request, res: Response) {
  res
    .status(httpStatus.OK)
    .json({ message: "App-notifcation service is healthy" });
};
