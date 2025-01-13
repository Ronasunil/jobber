import { authAxios } from "@gateway/services/api/auth";
import {
  GigCreationAttrs,
  GigsQuery,
  GigUpdateAttrs,
} from "@ronasunil/jobber-shared";
import { axiosInstance } from "@gateway/services/axios";
import { config } from "@gateway/Config";

export const gigAxios = axiosInstance(`${config.GIG_SERVICE_URL}/api/v1/gigs`);

export const searchGigbyId = async function (gigId: string) {
  const response = await authAxios.get(`/auth/gigs/search/${gigId}`);
  return response;
};

export const searchGigs = async function (obj: GigsQuery) {
  const { query, from, max, min, size, deliveryDate } = obj;
  const response = await authAxios.get(
    `/auth/gigs/search?query=${query}&from=${from}&max=${max}&min=${min}&size=${size}&deliveryDate=${deliveryDate}`
  );

  return response;
};

export const createGig = async function (body: GigCreationAttrs) {
  const response = await gigAxios.post("", body);
  return response;
};

export const deleteGig = async function (sellerId: string, gigId: string) {
  const response = await gigAxios.delete(`/${sellerId}/${gigId}`);
  return response;
};

export const updateGig = async function (
  sellerId: string,
  gigId: string,
  data: GigUpdateAttrs
) {
  const response = await gigAxios.patch(`/${sellerId}/${gigId}`, data);
  return response;
};

export const gigBySellerId = async function (sellerId: string) {
  const response = await gigAxios.get(`/seller/${sellerId}`);
  return response;
};

export const gigByActiveStatus = async function (
  sellerId: string,
  status: string
) {
  const response = await gigAxios.get(`/seller/status/${sellerId}/${status}`);
  return response;
};

export const getSimilarGigs = async function (gigId: string) {
  const response = await gigAxios.get(`/similar/${gigId}`);
  return response;
};

export const getTopRatedGigs = async function () {
  const response = await gigAxios.get("/top-rated");
  return response;
};

export const getGigByCategory = async function (category: string) {
  const response = await gigAxios.get(`/category/${category}`);
  return response;
};
