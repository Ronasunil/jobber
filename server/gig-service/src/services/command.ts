import {
  createIndexData,
  deleteIndexData,
  updateGigRatings,
  updateIndexData,
} from "@gig/elasticsearch";
import { GigUpdateAttrs } from "@gig/interfaces/gigInterface";
import { GigModel } from "@gig/models/gigModel";
import { publishDirectMessage } from "@gig/queues/gigProducer";
import { gigChannel } from "@gig/server";
import {
  BadRequest,
  GigCreationAttrs,
  GigRatingUpdateAttrs,
} from "@ronasunil/jobber-shared";

export const createGig = async function (data: GigCreationAttrs) {
  const gig = await GigModel.create(data);
  const transformedGig = gig.toJSON();

  await createIndexData("gigs", transformedGig);

  //publishing event to update the gig count in user service(seller)
  const message = JSON.stringify({
    count: 1,
    sellerId: transformedGig.sellerId,
    type: "update-gig-count",
  } as {
    count: number;
    sellerId: string;
    type: string;
  });

  await publishDirectMessage(
    gigChannel,
    "seller-job-lifecycle",
    "job-assigned",
    message,
    "Published update gig count event inc"
  );
};

export const deleteGig = async function (sellerId: string, id: string) {
  const gig = await GigModel.findOne({ sellerId, _id: id });

  if (!gig) throw new BadRequest("Gig not found", "deleteGig:() gig service");
  await GigModel.findOneAndDelete({ sellerId, _id: id });

  await deleteIndexData("gigs", id);

  //publishing event to update the gig count in user service(seller)
  const message = JSON.stringify({
    count: -1,
    sellerId: sellerId,
    type: "update-gig-count",
  } as {
    count: number;
    sellerId: string;
    type: string;
  });

  await publishDirectMessage(
    gigChannel,
    "seller-job-lifecycle",
    "job-assigned",
    message,
    "Published update gig count event dec"
  );
};

export const updateGig = async function (
  sellerId: string,
  id: string,
  gigDoc: GigUpdateAttrs
) {
  const gig = await GigModel.findOne({ sellerId, _id: id });

  if (!gig) throw new BadRequest("Gig not found", "updateGig:() gig service");
  await GigModel.findOneAndUpdate({ sellerId, _id: id }, gigDoc);

  await updateIndexData("gigs", id, gigDoc);
};

export const addReview = async function (doc: GigRatingUpdateAttrs) {
  const { gigId } = doc;
  const ratingsMap: Record<string, string> = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
  };

  const ratingsKey = ratingsMap[`${doc.ratingsCount}`];

  const gig = await GigModel.findById(gigId);

  if (!gig)
    throw new BadRequest(
      `Cant find gig with this id:${gigId}`,
      "Gig service addReview():"
    );

  gig.set({
    ratingsCount: (gig.ratingsCount += 1),
    ratingsSum: (gig.ratingsSum += doc.ratingsCount),
    [`ratingsCategories.${ratingsKey}.count`]: 1,
    [`ratingsCategories.${ratingsKey}.value`]: doc.ratingsCount,
    ratings: (gig.ratingsSum += doc.ratingsCount) / (gig.ratingsCount += 1),
  });

  await gig.save({ validateBeforeSave: true });

  await updateGigRatings("gigs", doc, ratingsKey);

  // publishing event to update user seller ratings

  const message = JSON.stringify({
    ratingCount: doc.ratingsCount,
    sellerId: doc.sellerId,
  } as {
    sellerId: string;
    ratingCount: number;
  });
  await publishDirectMessage(
    gigChannel,
    "seller-review",
    "add",
    message,
    "Add rating event published for user service"
  );
};
