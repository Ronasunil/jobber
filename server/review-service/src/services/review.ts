import { Review } from "@review/model/reviewModel";
import { EmitReviewCreation } from "@review/utils/helpers";
import { BadRequest, ReviewCreationAttrs } from "@ronasunil/jobber-shared";

export const getSellerReviews = async function (
  sellerId: string
): Promise<Review[]> {
  const reviews = Review.findAll({ where: { sellerId } });
  return reviews;
};

export const createReview = async function (
  data: ReviewCreationAttrs
): Promise<Review> {
  const review = await Review.create({ ...data });
  new EmitReviewCreation(review);
  return review;
};

export const getReviewById = async function (
  reviewId: string
): Promise<Review> {
  const review = await Review.findByPk(reviewId);
  if (!review)
    throw new BadRequest(
      `can't find review regarding this id:${reviewId}`,
      "getReviewById  review service"
    );

  return review;
};

export const getGigReviews = async function (gigId: string): Promise<Review[]> {
  const reviews = await Review.findAll({ where: { gigId } });
  return reviews;
};

export const deleteReview = async function (
  reviewId: string,
  username: string
): Promise<void> {
  const review = await Review.findOne({
    where: { reviewerUsername: username, id: reviewId },
  });
  if (!review)
    throw new BadRequest(
      `Review not found or revie may be created by others`,
      "deleteReview(): order service"
    );
  const [affectedRows] = await Review.update(
    { isDeleted: true },
    { where: { id: reviewId } }
  );
  if (affectedRows === 0)
    throw new BadRequest(
      `can't find review regarding this id:${reviewId}`,
      "getReviewById  review service"
    );
};
