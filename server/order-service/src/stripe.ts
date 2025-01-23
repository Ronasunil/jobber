import { winstonLogger } from "@ronasunil/jobber-shared";
import Stripe from "stripe";
import { config } from "@order/Config";

const logger = winstonLogger(
  config.ELASTIC_SEARCH_ENDPOINT!,
  "Order service",
  "info"
);

export const createCustomer = async function (stripe: Stripe, email: string) {
  const customer = await stripe.customers.create({
    email,
  });

  return customer;
};
export const checkCustomerExists = async function (
  stripe: Stripe,
  email: string
): Promise<Stripe.Response<Stripe.ApiSearchResult<Stripe.Customer>>> {
  const customer = await stripe.customers.search({
    query: `email:"${email}"`,
  });

  return customer;
};

export const setupIntent = async function (
  stripe: Stripe,
  customerId: string,
  price: number
): Promise<Stripe.Response<Stripe.PaymentIntent>> {
  const intent = await stripe.paymentIntents.create({
    amount: Math.floor(price) * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },

    customer: customerId,
  });

  return intent;
};

export const createRefund = async function (
  stripe: Stripe,
  paymentIntent: string
) {
  try {
    await stripe.refunds.create({
      payment_intent: paymentIntent,
    });
  } catch (err) {
    logger.info("Error creating refund");
    logger.error(err);
  }
};
