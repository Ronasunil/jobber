import {
  Certificate,
  Education,
  Experience,
  Language,
  RatingCategories,
} from "@ronasunil/jobber-shared";
import mongoose from "mongoose";

export interface SellerDoc extends mongoose.Document {
  _id: string | mongoose.Schema.Types.ObjectId;
  fullName: string;
  username: string;
  email: string;
  profilePhoto: string;
  skills: string[];
  language: Language[];
  description: string;
  oneLiner: string;
  experience: Experience[];
  ratingsCount: number;
  ratingsCategories: RatingCategories;
  education: Education[];
  certificate: Certificate[];
  responseTime: number;
  recentDelivery: Date;
  ongoingJobs: number;
  cancelledJobs: number;
  totalEarning: number;
  totalGigs: number;
  completedJobs: number;
  createdAt: Date;
}

export interface CompleteJob {
  recentDelivery: Date;
  ongoingJobs: number;
  completedJobs: number;
  totalEarning: number;
}
