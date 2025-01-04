import Joi from "joi";

export const buyerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.base": "username must be string",
    "string.min": "username must have 3 characters",
    "string.empty": "username is required",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "email must be string",
    "string.email": "Invalid email",
    "string.empty": "email is required",
  }),

  profilePhoto: Joi.string().optional().allow(null).messages({
    "string.base": "profilePhoto must be string",
    "string.empty": "profilePhoto is empty",
  }),

  country: Joi.string().optional().allow(null).messages({
    "string.base": "profilePhoto must be string",
    "string.empty": "profilePhoto is empty",
  }),

  isBuyer: Joi.boolean().required().messages({
    "boolean.base": "isBuyer must be boolean",
    "any.required": "isBuyer is required field",
  }),
});
