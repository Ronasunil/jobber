import { Request, Response } from "express";
import httpStatus from "http-status-codes";

export const health = function (_req: Request, res: Response) {
  res.json(httpStatus.OK).json({ messge: "Gig service is healthy" });
};
