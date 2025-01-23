import { config } from "@order/Config";
import Stripe from "stripe";

const getStripe = function (): Stripe {
  const stripe = new Stripe(config.STRIPE_API_KEY!, { typescript: true });
  return stripe;
};

export const stripe = getStripe();
