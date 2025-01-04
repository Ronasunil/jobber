import { SellerDoc } from "@user/interfaces/sellerInterface";
import { model, Schema } from "mongoose";

const sellerSchema = new Schema(
  {
    fullName: { type: String, required: true, index: true },
    username: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    profilePhoto: { type: String, default: "" },
    skills: [{ type: String, required: true }],
    language: [
      {
        lang: { type: String, required: true, default: "English" },
        level: { type: String, required: true, default: "Basic" },
      },
    ],

    description: { type: String, required: true },
    oneLiner: { type: String, required: true },

    experience: [
      {
        company: { type: String, default: "" },
        from: { type: Date, default: "" },
        to: { type: Date, default: "" },
        currentlyWorking: { type: Boolean, default: false },
        description: { type: String, default: "" },
      },
    ],
    ratingsCount: { type: Number, default: 0 },
    ratingsCategories: [
      {
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
    ],

    education: [
      {
        startingDate: { type: Date, default: "" },
        title: { type: String, default: "" },
        university: { type: String, default: "" },
        course: { type: String, default: "" },
      },
    ],
    certificate: [
      {
        name: String,
        year: Number,
        from: String,
        default: [],
      },
    ],

    responseTime: { type: Number, default: 1, required: true },
    recentDelivery: { type: Date, default: "" },
    ongoingJobs: { type: Number, defualt: 0 },
    cancelledJobs: { type: Number, default: 0 },
    totalEarning: { type: Number, default: 0 },
    totalGigs: { type: Number, default: 0 },
    completedJobs: { type: Number, default: 0 },
    createdAt: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

const SellerModel = model<SellerDoc>("Seller", sellerSchema);

export { SellerModel };
