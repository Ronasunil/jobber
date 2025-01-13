import Joi from "joi";

export const gigUpdateSchema = Joi.object({
  profilePhoto: Joi.string().optional().messages({
    "string.base": "profilePhoto must be string",
  }),

  description: Joi.string().optional().messages({
    "string.base": "description must be string",
  }),
  basicDescription: Joi.string().optional().messages({
    "string.base": "basicDescription must be string",
  }),
  title: Joi.string().optional().messages({
    "string.base": "title must be string",
  }),
  coverImage: Joi.string().optional().messages({
    "string.base": "coverImage must be string",
  }),

  tags: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": "tag  must be string",
        "string.empty": "tag cannot be empty string",
        "string.required": "atleast one tag required",
      })
    )
    .optional()
    .messages({
      "array.base": "tags must be array",
    }),

  categories: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": "category  must be string",
        "string.empty": "category  cannot be empty string",
        "string.required": "atleast one category  required",
      })
    )
    .optional()
    .messages({
      "array.base": "categories must be array",
    }),

  subCategories: Joi.array()
    .items(
      Joi.string().required().messages({
        "string.base": "category  must be string",
        "string.empty": "category  cannot be empty string",
        "string.required": "atleast one category  required",
      })
    )
    .optional()
    .messages({
      "array.base": "subCategories must be array",
    }),
  active: Joi.boolean().optional().messages({
    "boolean.base": "acitive must be boolean",
  }),

  expectedDelivery: Joi.date().optional().min("now").messages({
    "date.base": "expectedDelivery must be a date",
    "date.min": "expectedDelivery cannot be in the past",
  }),
});
