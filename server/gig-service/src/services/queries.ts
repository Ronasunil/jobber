import {
  getGigByActiveStatus,
  getGigBySellerId,
  getIndexData,
  gigByCategories,
  gigMoreLikeThis,
  topRatedGigs,
} from "@gig/elasticsearch";
import { GigAttrs, GigHit } from "@gig/interfaces/gigInterface";

export const getGigById = async function (
  id: string
): Promise<GigAttrs | undefined> {
  const gig = await getIndexData("gigs", id);
  return gig;
};

export const getSellerGigs = async function (
  sellerId: string
): Promise<GigHit[]> {
  const gigs = await getGigBySellerId(sellerId);
  return gigs;
};

export const getSellerGigByActiveStatus = async function (
  sellerId: string,
  status: Boolean
): Promise<GigHit[]> {
  const gigs = await getGigByActiveStatus(sellerId, status);
  return gigs;
};

export const getSimilarGig = async function (gigId: string): Promise<GigHit[]> {
  const gigs = await gigMoreLikeThis(gigId);
  return gigs;
};

export const getTopRatedGigs = async function (): Promise<GigHit[]> {
  const gigs = await topRatedGigs();
  console.log(gigs, "gigs");
  return gigs;
};

export const getGigByCategories = async function (
  category: string
): Promise<GigHit[]> {
  const gigs = await gigByCategories(category);
  return gigs;
};
