import { authAxios } from "@gateway/services/api/auth";
import { GigsQuery } from "@ronasunil/jobber-shared";

export const searchGigbyId = async function (gigId: string) {
  const response = await authAxios.get(`/auth/gigs/search/${gigId}`);
  return response;
};

export const searchGigs = async function (obj: GigsQuery) {
  const { query, from, max, min, size } = obj;
  const response = await authAxios.get(
    `/auth/gigs/search?query=${query}&from=${from}&max=${max}&min=${min}&size=${size}`
  );

  return response;
};
