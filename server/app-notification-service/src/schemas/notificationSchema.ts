import Joi from "joi";

export const notifcationSchema = Joi.object({
  userFrom: Joi.string().required().messages({
    "string.base": "userFrom must be receiverProfilePhoto",
    "string.empty": "userFrom cannot be empty",
    "any.required": "Userfrom is required field",
  }),

  userTo: Joi.string().required().messages({
    "string.base": "userTo must be receiverProfilePhoto",
    "string.empty": "userTo cannot be empty",
    "any.required": "userTo is required field",
  }),

  senderUsername: Joi.string().required().messages({
    "string.base": "senderUsername must be receiverProfilePhoto",
    "string.empty": "senderUsername cannot be empty",
    "any.required": "senderUsername is required field",
  }),

  receiverUsername: Joi.string().required().messages({
    "string.base": "receiverUsername must be receiverProfilePhoto",
    "string.empty": "receiverUsername cannot be empty",
    "any.required": "receiverUsername is required field",
  }),

  senderProfilePhoto: Joi.string().required().messages({
    "string.base": "senderProfilePhoto must be receiverProfilePhoto",
    "string.empty": "senderProfilePhoto cannot be empty",
    "any.required": "senderProfilePhoto is required field",
  }),

  receiverProfilePhoto: Joi.string().required().messages({
    "string.base": "receiverProfilePhoto must be receiverProfilePhoto",
    "string.empty": "receiverProfilePhoto cannot be empty",
    "any.required": "receiverProfilePhoto is required field",
  }),

  message: Joi.string().required().messages({
    "string.base": "message must be string",
    "string.empty": "message cannot be empty",
    "any.required": "message is required field",
  }),

  isRead: Joi.boolean().optional().messages({
    "boolean.base": "isRead must be boolean",
  }),

  createdAt: Joi.date().optional().messages({
    "date.base": "createdAt msut be a date",
  }),
});
