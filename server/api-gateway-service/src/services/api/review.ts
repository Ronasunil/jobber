import { config } from "@gateway/Config";
import { axiosInstance } from "@gateway/services/axios";
import { ReviewCreationAttrs } from "@ronasunil/jobber-shared";
import { AxiosResponse } from "axios";

export const reviewAxios = axiosInstance(
  `${config.REVIEW_SERVICE_URL}/api/v1/reviews`
);

export const createReview = async function (
  data: ReviewCreationAttrs
): Promise<AxiosResponse> {
  const result = await reviewAxios.post("/", data);
  return result;
};

export const getSellerReviews = async function (
  sellerId: string
): Promise<AxiosResponse> {
  const result = await reviewAxios.get(`/seller/${sellerId}`);
  return result;
};

export const getReviewById = async function (
  reviewId: string
): Promise<AxiosResponse> {
  const result = await reviewAxios.get(`/${reviewId}`);
  return result;
};

export const deleteReview = async function (
  reviewId: string
): Promise<AxiosResponse> {
  const result = await reviewAxios.patch(`/${reviewId}`);
  return result;
};

export const getGigReviews = async function (
  gigId: string
): Promise<AxiosResponse> {
  const result = await reviewAxios.get(`gig/${gigId}`);
  return result;
};
