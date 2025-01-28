import Joi from "joi";

export const reviewCreationSchema = Joi.object({
  gigId: Joi.string().optional().messages({
    "string.empty": "sellerId cannot be empty",
    "string.base": "gigId must be string",
  }),
  sellerId: Joi.string().optional().messages({
    "string.empty": "sellerId cannot be empty",
    "string.base": "sellerId must be string",
  }),
  reviewerId: Joi.string().required().messages({
    "string.empty": "reviewerId cannot be empty",
    "string.base": "reviewerId must be string",
    "any.required": "reviewerId is required field",
  }),

  buyerId: Joi.string().optional().messages({
    "string.empty": "buyerId cannot be empty",
    "string.base": "buyerId must be string",
  }),
  reviewerProfilePhoto: Joi.string().required().messages({
    "string.empty": "reviewerProfilePhoto cannot be empty",
    "string.base": "reviewerProfilePhoto must be string",
    "any.required": "reviewerProfilePhoto is required field",
  }),
  reviewerUsername: Joi.string().required().messages({
    "string.empty": "reviewerUsername cannot be empty",
    "string.base": "reviewerUsername must be string",
    "any.required": "reviewerUsername is required field",
  }),

  rating: Joi.number().required().min(1).max(5).messages({
    "number.base": "rating must be a number",
    "number.min": "Rating must be at least 1.",
    "number.max": "Rating must be 5 or less.",
  }),
  type: Joi.string()
    .valid("gig-review", "recommendation", "order-rating")
    .required()
    .messages({
      "string.base": "type must be a string",
      "any.required": "type is required field",
      "string.valid": "type muse be review , recommendation, order-rating",
    }),
  isDeleted: Joi.boolean().required().messages({
    "boolean.base": "isDeleted must be a boolean",
    "any.required": "isDeleted is required field",
  }),
  review: Joi.string().required().messages({
    "string.base": "review must be a string",
    "any.required": "review is required field",
  }),

  orderReviewType: Joi.valid("seller", "buyer").optional().messages({
    "string.valid": "orderReviewType muse be either seller or buyer",
  }),
})
  .xor("gigId", "sellerId", "buyerId")
  .messages({
    "object.missing": "Either gigId, sellerId, buyerId must be provided",
  });
