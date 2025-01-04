import {
  SellerCreationAttrs,
  SellerUpdateAttrs,
} from "@ronasunil/jobber-shared";
import { CompleteJob, SellerDoc } from "@user/interfaces/sellerInterface";
import { SellerModel } from "@user/models/sellerModel";

export const createSeller = async function (data: SellerCreationAttrs) {
  await SellerModel.create(data);
};

export const getSellerByUsername = async function (
  username: string
): Promise<SellerDoc | null> {
  const user = await SellerModel.findOne({ username });
  return user;
};

export const getSellerById = async function (
  SellerId: string
): Promise<SellerDoc | null> {
  const user = await SellerModel.findById(SellerId);
  return user;
};

export const getSellerByEmail = async function (
  email: string
): Promise<SellerDoc | null> {
  const user = await SellerModel.findOne({ email });
  return user;
};

export const updateSeller = async function (
  sellerId: string,
  data: SellerUpdateAttrs
) {
  await SellerModel.findByIdAndUpdate(sellerId, data);
};

export const updateTotalGigs = async function (
  sellerId: string,
  count: number
) {
  await SellerModel.findByIdAndUpdate(sellerId, {
    $inc: { totalGigs: count },
  });
};

export const updateOngoingJob = async function (
  sellerId: string,
  count: number
) {
  await SellerModel.findByIdAndUpdate(sellerId, {
    $inc: { ongoingJobs: count },
  });
};

export const updateCancelledJob = async function (
  sellerId: string,
  count: number
) {
  await SellerModel.findByIdAndUpdate(sellerId, {
    $inc: { cancelledJobs: count },
  });
};

export const sellerJobCompleted = async function (
  sellerId: string,
  data: CompleteJob
) {
  const { recentDelivery, ongoingJobs, completedJobs, totalEarning } = data;

  await SellerModel.findByIdAndUpdate(sellerId, {
    $inc: { completedJobs, ongoingJobs, totalEarning },
    $set: { recentDelivery },
  });
};

export const addSellerReview = async function (
  sellerId: string,
  ratingCount: number
) {
  const ratingMap: Record<string, any> = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
  };

  const ratingKey = ratingMap[`${ratingCount}`];

  await SellerModel.findByIdAndUpdate(sellerId, {
    $inc: {
      ratingsCount: ratingCount,
      [`ratingsCategories.${ratingKey}.count`]: 1,
      [`ratingsCategories.${ratingKey}.value`]: ratingCount,
    },
  });
};

export const cancelJob = async function (sellerId: string) {
  SellerModel.findByIdAndUpdate(sellerId, {
    $inc: { cancelledJobs: 1, ongoingJobs: -1 },
  });
};

export const getRandomSellers = async function (count: number) {
  const sellers = (await SellerModel.aggregate([
    { $sample: { size: count } },
  ])) as SellerDoc[];
  return sellers;
};
