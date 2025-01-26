export interface ReviewDoc {
  id: number;
  gigId?: string;
  sellerId?: string;
  reviewerId: string;
  reviewerProfilePhoto: string;
  reviewerUsername: string;
  type: "review" | "recommendation";
  isDeleted: Boolean;
  review: string;
  createdAt?: Date;
}
