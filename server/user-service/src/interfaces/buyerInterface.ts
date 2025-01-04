import mongoose from "mongoose";

export interface BuyerDoc extends mongoose.Document {
  _id: string | mongoose.Schema.Types.ObjectId;
  email: string;
  username: string;
  profilePhoto: string;
  isBuyer: Boolean;
  country: string;
  purchasedGigs: string[];
  createdAt: string;
}
