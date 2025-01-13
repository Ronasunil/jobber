import { GigDoc } from "@gig/interfaces/gigInterface";
import mongoose, { model, Schema } from "mongoose";

const gigSchema = new Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
    },

    profilePhoto: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    basicDescription: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      required: true,
    },

    tags: {
      type: Array,
      required: true,
    },

    categories: {
      type: Array,
      required: true,
    },

    subCategories: {
      type: Array,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
      required: true,
    },

    expectedDelivery: {
      type: Date,
      required: true,
    },

    ratingsCount: {
      type: Number,
      default: 0,
    },

    ratingsSum: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    ratingsCategories: {
      five: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },

      four: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
      three: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
      two: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
      one: {
        value: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
      },
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
    toJSON: {
      transform(doc, rec) {
        delete rec._id;
        rec.id = doc._id;

        return rec;
      },
    },
  }
);

gigSchema.pre("save", function (next) {
  if (!this.ratingsCount) return next();
  this.rating = this.ratingsSum / this.ratingsCount;
  next();
});

export const GigModel = model<GigDoc>("Gig", gigSchema);
