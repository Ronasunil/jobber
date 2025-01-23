import { Request, Response } from "express";
import Stripe from "stripe";
import httpStatus from "http-status-codes";
import {
  checkCustomerExists,
  createCustomer,
  setupIntent,
} from "@order/stripe";

import { createOrder } from "@order/services/orderService";
import { stripe } from "@order/controllers/global";
import { OrderCreationAttr } from "@ronasunil/jobber-shared";

export const intent = async function (req: Request, res: Response) {
  const { email } = req.body as { email: string };

  const customerExist = await checkCustomerExists(stripe, email);
  let customer: Stripe.Customer;
  if (!customerExist.data.length)
    customer = await createCustomer(stripe, email);
  else customer = customerExist.data[0];

  const intent = await setupIntent(stripe, customer.id, req.body.amount);
  res.status(httpStatus.OK).json({
    message: "Intent created succesfully",
    clientSecret: intent.client_secret,
    customerId: customer.id,
  });
};

export const order = async function (req: Request, res: Response) {
  const body = req.body as OrderCreationAttr;

  const order = await createOrder(body);

  res.status(httpStatus.OK).json({ message: "Order created", order });
};
