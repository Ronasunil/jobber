import { BuyerDoc } from "@user/interfaces/buyerInterface";
import mongoose, { model, Schema } from "mongoose";

const buyerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      index: true,
    },

    email: {
      type: String,
      required: true,
      index: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      required: true,
      default: "India",
    },

    isBuyer: {
      type: Boolean,
      default: true,
    },

    purchasedGigs: [
      { type: mongoose.Schema.ObjectId, ref: "Gig", default: [] },
    ],
    createdAt: { type: Date, default: new Date() },
  },

  { versionKey: false }
);

const BuyerModel = model<BuyerDoc>("Buyer", buyerSchema);

export { BuyerModel };
