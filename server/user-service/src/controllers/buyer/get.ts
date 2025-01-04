import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import {
  getBuyerByEmail,
  getBuyerByUsername,
} from "@user/services/buyerService";
import { BadRequest } from "@ronasunil/jobber-shared";

export const email = async function (req: Request, res: Response) {
  const { email } = req.params as { email: string };
  const buyer = await getBuyerByEmail(email);

  res.status(httpStatus.OK).json({ messages: "Buyer", buyer });
};

export const username = async function (req: Request, res: Response) {
  const { username } = req.params;

  const buyer = await getBuyerByUsername(username);
  res.status(httpStatus.OK).json({ messages: "Buyer", buyer });
};
