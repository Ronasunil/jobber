import { OrderDoc } from "@order/interfaces/orderInterface";
import mongoose, { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      ref: "Seller",
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      ref: "Buyer",
    },

    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      ref: "Gig",
    },

    gigTitle: {
      type: String,
      required: true,
      index: true,
    },

    sellerUsername: {
      type: String,
      index: true,
      required: true,
    },

    receiverUsername: {
      type: String,
      index: true,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentIntent: {
      type: String,
      required: true,
    },

    offer: {
      newDeliveryDate: { type: Date },
      oldDeliveryDate: { type: Date },
      title: { type: String, required: true },
      deliveryInDays: { type: Date, required: true },
      price: { type: Number, required: true },
      accepted: { type: Boolean, required: true },
      cancelled: { type: Boolean, required: true },
    },

    status: {
      type: String,
      enums: ["Ordered", "Delivered", "Accepted", "Rejected"],
      default: "Ordered",
    },

    statusChangeTime: {
      type: Date,
    },

    buyerRating: {
      rating: { type: Number },
      review: { type: String },
    },

    sellerRating: {
      rating: { type: Number },
      review: { type: String },
    },

    deliveredFile: [
      {
        file: String,
        fileType: String,
        fileSize: String,
        fileName: String,
      },
    ],

    extensionRequest: {
      oldDeliveryDate: { type: Date },
      newDeliveryDate: { type: Date },
      reason: { type: String },
      rejected: { type: Boolean, default: false },
      accepted: { type: Boolean, default: false },
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const OrderModel = model<OrderDoc>("Order", orderSchema);

export { OrderModel };
