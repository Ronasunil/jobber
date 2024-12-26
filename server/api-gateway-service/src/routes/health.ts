import { Router, Request, Response } from "express";
import httpStatus from "http-status-codes";

export const healthRoute = function (): Router {
  const router = Router();

  router.get("/gateway-health", (_req: Request, res: Response) => {
    res.status(httpStatus.OK).json({ message: "Gateway service is healthy" });
  });

  return router;
};
