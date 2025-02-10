import { Request, Response } from "express";
import httpStatus from "http-status-codes";

export const chatHealth = function (_req: Request, res: Response) {
  res.status(httpStatus.OK).json({ message: "Chat service is healthy" });
};
