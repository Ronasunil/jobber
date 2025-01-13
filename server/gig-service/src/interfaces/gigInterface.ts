import mongoose from "mongoose";
import { RatingCategories } from "@ronasunil/jobber-shared";

export interface GigDoc extends mongoose.Document {
  id: string | mongoose.Schema.Types.ObjectId;
  sellerId: string | mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  profilePhoto: string;
  description: string;
  basicDescription: string;
  title: string;
  coverImage: string;
  tags: string[];
  categories: string[];
  subCategories: string[];
  active: Boolean;
  expectedDelivery: Date;
  ratingsCount: number;
  ratingsSum: number;
  rating: number;
  ratingsCategories: RatingCategories;
  createdAt: Date;
}

export interface GigAttrs {
  id: string | mongoose.Schema.Types.ObjectId;
  sellerId: string | mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  profilePhoto: string;
  description: string;
  basicDescription: string;
  title: string;
  coverImage: string;
  tags: string[];
  categories: string[];
  subCategories: string[];
  active: Boolean;
  expectedDelivery: Date;
  ratingsCount: number;
  ratingsCategories: RatingCategories[];
  createdAt: Date;
}

export interface GigUpdateAttrs {
  profilePhoto?: string;
  description?: string;
  basicDescription?: string;
  title?: string;
  coverImage?: string;
  tags?: string[];
  categories?: string[];
  subCategories?: string[];
  active?: Boolean;
  expectedDelivery?: Date;
}

export interface GitRatingUpdateAttrs {
  ratingsCount: number;
  sellerId: string;
  gigId: string;
}

export interface GigHit {
  _index: string;
  _id: string;
  _score: number;
  _source: GigAttrs;
}
