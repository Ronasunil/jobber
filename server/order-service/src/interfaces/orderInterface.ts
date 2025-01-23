import { ExtensionRequest, FileDelivery } from "@ronasunil/jobber-shared";
import mongoose from "mongoose";

interface Seller {
  profilePhoto: string;
}

interface Buyer {
  profilePhoto: string;
}

export interface PopulatedOrder extends mongoose.Document {
  sellerId: Seller;
  buyerId: Buyer;
  gigId: string;
  gigTitle: string;
  sellerUsername: string;
  receiverUsername: string;
  amount: number;
  paymentIntent: string;
  offer: {
    newDeliveryDate: Date;
    oldDeliveryDate: Date;
    title: string;
    deliveryInDays: Date;
    reason: string;
    price: number;
    accepted: Boolean;
    cancelled: Boolean;
  };

  status: Status;
  statusChangeTime: Date;
  buyerRating: {
    rating: number;
    review: string;
  };

  sellerRating: {
    rating: number;
    review: string;
  };

  deliveredFile: FileDelivery[];

  extensionRequest: ExtensionRequest;

  createdAt: Date;
}

export interface OrderDoc extends mongoose.Document {
  sellerId: string;
  buyerId: string;
  gigId: string;
  gigTitle: string;
  sellerUsername: string;
  receiverUsername: string;
  amount: number;
  paymentIntent: string;
  offer: {
    newDeliveryDate: Date;
    oldDeliveryDate: Date;
    title: string;
    deliveryInDays: Date;
    reason: string;
    price: number;
    accepted: Boolean;
    cancelled: Boolean;
  };

  status: Status;
  statusChangeTime: Date;
  buyerRating: {
    rating: number;
    review: string;
  };

  sellerRating: {
    rating: number;
    review: string;
  };

  deliveredFile: FileDelivery[];

  extensionRequest: ExtensionRequest;

  createdAt: Date;
}

export interface OrderDelivery {
  file: string;
  fileType: string;
  fileSize: string;
  fileName: string;
}
