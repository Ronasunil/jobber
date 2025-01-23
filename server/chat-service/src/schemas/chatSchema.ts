import Joi from "joi";
import { addDays } from "date-fns";

export const chatSchema = Joi.object({
  conversationId: Joi.string().optional().messages({
    "string.base": "conversationId must be string",
    "string.empty": "conversationId cannot be empty",
  }),

  receiverId: Joi.string().required().messages({
    "string.base": "receiverId must be string",
    "string.empty": "receiverId cannot be empty",
    "any.required": "receiverId is required",
  }),

  senderId: Joi.string().required().messages({
    "string.base": "senderId must be string",
    "string.empty": "senderId cannot be empty",
    "any.required": "senderId is required",
  }),

  receiverProfilePhoto: Joi.string().required().messages({
    "string.base": "receiverProfilePhoto must be string",
    "string.empty": "receiverProfilePhoto cannot be empty",
    "any.required": "receiverProfilePhoto is required",
  }),

  senderProfilePhoto: Joi.string().required().messages({
    "string.base": "senderProfilePhoto must be string",
    "string.empty": "senderProfilePhoto cannot be empty",
    "any.required": "senderProfilePhoto is required",
  }),

  senderUsername: Joi.string().required().messages({
    "string.base": "senderUsername must be string",
    "string.empty": "senderUsername cannot be empty",
    "any.required": "senderUsername is required",
  }),

  receiverUsername: Joi.string().required().messages({
    "string.base": "receiverUsername must be string",
    "string.empty": "receiverUsername cannot be empty",
    "any.required": "receiverUsername is required",
  }),

  body: Joi.string().required().allow(null, "").messages({
    "string.base": "body must be string",
    "string.empty": "body cannot be empty",
    "any.required": "body is required",
  }),

  isRead: Joi.boolean().required().default(false).messages({
    "boolean.base": "isRead must be a boolean",
    "any.required": "isRead is required",
  }),

  hasOffer: Joi.boolean().required().messages({
    "boolean.base": "hasOffer must be a boolean",
    "any.required": "hasOffer is required",
  }),

  file: Joi.string()
    .optional()
    .allow(null, "")
    .messages({ "string.base": "file must be string" }),

  fileSize: Joi.string()
    .optional()
    .allow(null, "")
    .messages({ "string.base": "fileSize must be string" }),

  fileType: Joi.string()
    .optional()
    .allow(null, "")
    .messages({ "string.base": "fileType must be string" }),

  fileName: Joi.string()
    .optional()
    .allow(null, "")
    .messages({ "string.base": "fileName must be string" }),

  offerGig: Joi.object({
    title: Joi.string().required().messages({
      "string.base": "title must be string",
      "string.required": "title is required",
    }),

    price: Joi.number().required().messages({
      "number.base": "price must be string",
      "any.required": "price is required",
    }),

    description: Joi.string().min(50).max(300).required().messages({
      "string.base": "description must be string",
      "string.min": "description minimum 50 characters needed",
      "string.max": "description maximum of  300 character needed",
      "string.required": "description is required",
    }),

    defaultDeliveryDate: Joi.date().required().messages({
      "date.base": "defaultDate must be a valid date.",
      "any.required": "deafult date is required",
    }),
    deliveryInDays: Joi.number().required().messages({
      "number.base": "deliveryInDays must be a  number",
      "any.required": "deliveryInDays is required",
    }),

    expectedDelivery: Joi.date()
      .min("now")
      .required()
      .max(addDays(new Date(), 20))
      .messages({
        "date.min": "The expected delivery date cannot be in the past.",
        "date.max":
          "The expected delivery date must be within 20 days from today.",
        "date.base": "The expected delivery date must be a valid date.",
      }),

    rejected: Joi.boolean().optional(),
    accepted: Joi.boolean().optional(),
  })
    .optional()
    .messages({
      "object.base": "OfferGig must be an object",
    }),
});
