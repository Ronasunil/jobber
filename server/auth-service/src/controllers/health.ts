import { Request, Response } from "express";
import httpStatus from "http-status-codes";

export const authHealth = function (_req: Request, res: Response) {
  res.status(httpStatus.OK).json({ message: "Auth service is healthy" });
};
