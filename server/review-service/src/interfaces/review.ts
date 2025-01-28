export interface ReviewDoc {
  id: number;
  gigId?: string;
  sellerId?: string;
  reviewerId: string;
  reviewerProfilePhoto: string;
  reviewerUsername: string;
  type: "gig-review" | "recommendation" | "order-rating";
  isDeleted: Boolean;
  review: string;
  rating: number;
  createdAt?: Date;
}
