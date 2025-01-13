import Joi from "joi";

export const gigCreateSchema = Joi.object({
  sellerId: Joi.string().required().messages({
    "string.base": "sellerId must be string",
    "any.required": "sellerId is required field",
    "string.empty": "sellerId must not be empty",
  }),

  username: Joi.string().required().messages({
    "string.base": "username must be string",
    "any.required": "username is required field",
    "string.empty": "username must not be empty",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "email must be string",
    "string.email": "Invalid email",
    "any.required": "email is required field",
    "string.empty": "email must not be empty",
  }),

  profilePhoto: Joi.string().required().messages({
    "string.base": "profilePhoto must be string",
  }),

  description: Joi.string().min(50).max(500).required().messages({
    "string.empty": "description cannot be empty",
    "string.min": "description atleast have 50 characters",
    "string.max": "description cannot exceed more than 500 characters",
    "any.required": "description is required",
  }),

  basicDescription: Joi.string().min(20).max(200).required().messages({
    "string.empty": "basicDescription cannot be empty",
    "string.min": "basicDescription atleast have 20 characters",
    "string.max": "basicDescription cannot exceed more than 200 characters",
    "any.required": "basicDescription is required",
  }),

  title: Joi.string().required().messages({
    "string.base": "title must be string",
    "any.required": "title is required field",
    "string.empty": "title must not be empty",
  }),

  coverImage: Joi.string().required().messages({
    "string.base": "coverImage must be string",
    "any.required": "coverImage is required field",
    "string.empty": "coverImage must not be empty",
  }),

  tags: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": "tag must be string",
        "any.required": "tag is required field",
      })
    )
    .required()
    .unique()
    .min(1)
    .messages({
      "array.base": "tags must be array",
      "any.required": "tags is required field",
      "array.unique": "tags must be unique",
      "array.min": "Atleast one tag is required",
    }),

  categories: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": "category must be string",
        "any.required": "category is required field",
      })
    )
    .required()
    .min(1)
    .unique()
    .messages({
      "array.base": "categories must be array",
      "any.required": "categories is required field",
      "array.min": "Atleast one category is required",
      "array.unique": "category must be unique",
    }),

  subCategories: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": "subCategory must be string",
        "any.required": "subCategory is required field",
      })
    )
    .required()
    .unique()
    .min(1)
    .messages({
      "array.base": "subCategories must be array",
      "any.required": "subCategories is required field",
      "array.min": "Atleast one sub category is required",
      "array.unique": "sub category must be unique",
    }),

  active: Joi.boolean().required().messages({
    "boolean.base": "active must be a boolean",
    "any.required": "active is required field",
  }),

  expectedDelivery: Joi.date().required().min("now").messages({
    "date.base": "expectedDelivery must be a date",
    "date.min": "expectedDelivery cannot be in the past",
    "any.required": "expectedDelivery is required field",
  }),
});
