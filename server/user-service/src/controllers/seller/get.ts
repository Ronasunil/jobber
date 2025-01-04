import { Request, Response } from "express";
import httpStatus from "http-status-codes";

import { BadRequest } from "@ronasunil/jobber-shared";
import {
  getRandomSellers,
  getSellerByEmail,
  getSellerByUsername,
} from "@user/services/sellerService";

export const username = async function (req: Request, res: Response) {
  const { username } = req.params as { username: string };

  const seller = await getSellerByUsername(username);
  if (!seller)
    throw new BadRequest(
      `${username} not found`,
      "username:() seller controller"
    );

  res.status(httpStatus.OK).json({ message: "Seller", seller });
};

export const email = async function (req: Request, res: Response) {
  const { email } = req.params as { email: string };

  const seller = await getSellerByEmail(email);
  if (!seller)
    throw new BadRequest(`${email} not found`, "email:() seller controller");

  res.status(httpStatus.OK).json({ message: "Seller", seller });
};

export const randomSellers = async function (req: Request, res: Response) {
  const { count } = req.params as { count: string };
  const sellers = await getRandomSellers(+count);

  res.status(httpStatus.OK).json({ message: "Seller", sellers });
};
