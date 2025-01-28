import { OrderReviewRating } from "@ronasunil/jobber-shared";
import { publishDirectMessage } from "@review/queues/reviewProducer";
import { reviewChannel } from "@review/server";
import { GigRatingUpdateAttrs } from "@ronasunil/jobber-shared";

import { Review } from "@review/model/reviewModel";

export class EmitReviewCreation {
  constructor(data: Review) {
    switch (data.type) {
      case "gig-review":
        this.emitGigReview(data);
      case "recommendation":
        this.emitSellerReview(data);
      case "order-rating":
        this.emitOrderRating(data);
    }
  }

  private emitGigReview(data: Review) {
    const msg = JSON.stringify({
      gigId: data.gigId,
      ratingsCount: data.rating,
      sellerId: data.sellerId,
    } as GigRatingUpdateAttrs);
    publishDirectMessage(
      reviewChannel,
      "gig-review",
      "add",
      msg,
      "Gig review added event emitted"
    );
  }

  private emitSellerReview(data: Review) {
    const msg = JSON.stringify({
      sellerId: data.sellerId,
      ratingCount: data.rating,
    } as {
      sellerId: string;
      ratingCount: number;
    });

    publishDirectMessage(
      reviewChannel,
      "seller-review",
      "add",
      msg,
      "Seller review added event emitted"
    );
  }

  private emitOrderRating(data: Review) {
    const msg = JSON.stringify({
      orderId: data.id,
      testimonials: {
        rating: data.rating,
        review: data.review,
      },
      type: data.type,
      orderReviewType: data.orderReviewType,
    } as OrderReviewRating);

    publishDirectMessage(
      reviewChannel,
      "order-review",
      "review",
      msg,
      "Order review added event emitted"
    );
  }
}
