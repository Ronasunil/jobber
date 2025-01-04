import { Response, Request } from "express";
import httpStatus from "http-status-codes";

export const userHealth = function (req: Request, res: Response) {
  res.status(httpStatus.OK).json({ message: "User service is healthy " });
};
