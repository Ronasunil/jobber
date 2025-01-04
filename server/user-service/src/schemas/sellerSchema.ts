import Joi, { number } from "joi";

export const sellerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    "string.base": "username must be string",
    "string.min": "username must have 3 characters",
    "string.empty": "username is required",
  }),

  fullName: Joi.string().required().messages({
    "string.base": "username must be string",
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

  skills: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      "array.base": "skills must be array",
      "array.min": "skills must have 1 skill",
      "any.required": "skills is required",
      "string.base": "Each skills must be string",
      "string.empty": "skill cannot be empty",
    }),

  language: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string().required().messages({
          "string.base": "language must be string",
          "string.empty": "language cannot be empty string",
          "any.required": "language is required",
        }),
        level: Joi.string().required().messages({
          "string.base": "level must be string",
          "string.empty": "level cannot be empty string",
          "any.required": "level is required",
        }),
      })
    )
    .required()
    .min(1)
    .messages({
      "array.base": "langauge must be array",
      "array.min": "must provide one language",
      "any.required": "langauge is required",
    }),

  description: Joi.string().required().min(50).messages({
    "string.base": "description must be string",
    "string.empty": "description cannot be empty",
    "string.min": "description must have 50 characters",
  }),

  oneLiner: Joi.string().required().messages({
    "string.base": "description must be string",
    "string.empty": "description cannot be empty",
  }),

  experience: Joi.array()
    .items(
      Joi.object({
        company: Joi.string().required().messages({
          "string.base": "company must be a string.",
          "string.empty": "company should not be empty string",
          "any.required": "company is required",
        }),
        from: Joi.date().required().messages({
          "date.base": "from must be valid date",
          "any.required": "from is required",
        }),
        to: Joi.date().required().messages({
          "date.base": "to must be valid date",
          "any.required": "to is required",
        }),
        currentlyWorking: Joi.boolean().required().default(false).messages({
          "boolean.base": "currentlyWorking must be a boolean value",
          "any.required": "currentlyWorking is required",
        }),
        description: Joi.string().required().default("").messages({
          "string.base": "description must be a string.",
          "any.required": "description is required",
        }),
      })
    )
    .optional()
    .default([])
    .messages({
      "array.base": "experience must be array",
    }),

  ratingsCount: Joi.number().default(0).optional().messages({
    "number.base": "ratingsCount must be number",
  }),

  ratingsCategories: Joi.array()
    .items(
      Joi.object({
        five: Joi.object({
          value: Joi.number().default(0).messages({
            "number.base": "value must be number",
          }),
          count: Joi.number().default(0).messages({
            "number.base": "count must be number",
          }),
        }),
        four: Joi.object({
          value: Joi.number().default(0).messages({
            "number.base": "value must be number",
          }),
          count: Joi.number().default(0).messages({
            "number.base": "count must be number",
          }),
        }),
        three: Joi.object({
          value: Joi.number().default(0).messages({
            "number.base": "value must be number",
          }),
          count: Joi.number().default(0).messages({
            "number.base": "count must be number",
          }),
        }),
        two: Joi.object({
          value: Joi.number().default(0).messages({
            "number.base": "value must be number",
          }),
          count: Joi.number().default(0).messages({
            "number.base": "count must be number",
          }),
        }),
        one: Joi.object({
          value: Joi.number().default(0).messages({
            "number.base": "value must be number",
          }),
          count: Joi.number().default(0).messages({
            "number.base": "count must be number",
          }),
        }),
      })
    )
    .optional()
    .messages({
      "array.base": "ratingCategories must be array",
    }),

  education: Joi.array()
    .items(
      Joi.object({
        startingDate: Joi.date().required().messages({
          "date.base": "starting date must be a valid date.",
          "any.required": "starting date is required.",
        }),
        title: Joi.string().required().messages({
          "string.base": "title must be a valid string.",
          "any.required": "title is required.",
        }),
        university: Joi.string().required().messages({
          "string.base": "university must be a valid string.",
          "any.required": "university is required.",
        }),
        course: Joi.string().required().messages({
          "string.base": "course must be a valid string.",
          "any.required": "course is required.",
        }),
      })
    )
    .optional()
    .messages({
      "array.base": "Education must be an array.",
    }),

  certificate: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.base": "name must be string.",
          "string.empty": "name should not be empty",
        }),
        year: Joi.date().messages({
          "date.base": "year must be a valid date.",
          "any.required": "year is required",
        }),
        from: Joi.string().required().messages({
          "string.base": "from must be a valid  string.",
          "string.empty": "from should not be empty string",
          "any.required": "from is required",
        }),
      })
    )
    .optional()
    .messages({
      "array.base": "cerificate must be array.",
    }),

  responseTime: Joi.number().required().messages({
    "number.base": "responseTime must be number",
    "any.required": "responseTime is required",
  }),

  recentDelivery: Joi.date().optional().messages({
    "date.base": "recent delivery  must be a date",
  }),
  ongoingJobs: Joi.number().optional().messages({
    "number.base": "ongoingDelivery must be number",
  }),
  cancelledJobs: Joi.number().optional().messages({
    "number.base": "cancelledNumber must be number",
  }),
  totalEarning: Joi.number().optional().messages({
    "number.base": "totalEarning must be number",
  }),
  totalGigs: Joi.number().optional().messages({
    "number.base": "totalGigs must be number",
  }),
  completedJobs: Joi.number().optional().messages({
    "number.base": "completedJobs must be number",
  }),
  createdAt: Joi.date().optional().messages({
    "date.base": "createdAt  must be a date",
  }),
});

// export interface SellerUpdateAttrs {
//   fullName?: string;
//   profilePhoto?: string;
//   skills?: string[];
//   language?: Language[];
//   description?: string;
//   oneLiner?: string;
//   experience?: Experience[];
//   education?: Education[];
//   certificate?: Certificate[];
//   responseTime?: number;
// }

export const sellerUpdateSchema = Joi.object({
  fullName: Joi.string().optional().messages({
    "string.base": "fullName must be string",
  }),

  profilePhoto: Joi.string().optional().messages({
    "string.base": "fullName must be string",
  }),

  skills: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "skills must be array",
  }),

  language: Joi.array()
    .items(
      Joi.object({
        lang: Joi.string().required().messages({
          "string.base": "lang must be string",
          "string.empty": "lang is required",
          "any.required": "lang is required",
        }),

        level: Joi.string().required().messages({
          "string.base": "level must be string",
          "string.empty": "level is required",
          "any.required": "level is required",
        }),
      })
    )
    .optional(),

  description: Joi.string().optional().messages({
    "string.base": "description must be string",
  }),

  oneLiner: Joi.string().optional().messages({
    "string.base": "oneLiner must be string",
  }),

  responseTime: Joi.number().optional().messages({
    "number.base": "oneLiner must be string",
  }),

  experience: Joi.array()
    .items(
      Joi.object({
        company: Joi.string().required().messages({
          "string.base": "company must be a string.",
          "string.empty": "company should not be empty string",
          "any.required": "company is required",
        }),
        from: Joi.date().required().messages({
          "date.base": "from must be valid date",
          "any.required": "from is required",
        }),
        to: Joi.date().required().messages({
          "date.base": "to must be valid date",
          "any.required": "to is required",
        }),
        currentlyWorking: Joi.boolean().required().default(false).messages({
          "boolean.base": "currentlyWorking must be a boolean value",
          "any.required": "currentlyWorking is required",
        }),
        description: Joi.string().required().default("").messages({
          "string.base": "description must be a string.",
          "any.required": "description is required",
        }),
      })
    )
    .optional(),

  education: Joi.array()
    .items(
      Joi.object({
        startingDate: Joi.date().required().messages({
          "date.base": "starting date must be a valid date.",
          "any.required": "starting date is required.",
        }),
        title: Joi.string().required().messages({
          "string.base": "title must be a valid string.",
          "any.required": "title is required.",
        }),
        university: Joi.string().required().messages({
          "string.base": "university must be a valid string.",
          "any.required": "university is required.",
        }),
        course: Joi.string().required().messages({
          "string.base": "course must be a valid string.",
          "any.required": "course is required.",
        }),
      })
    )
    .optional(),

  certificate: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          "string.base": "name must be string.",
          "string.empty": "name should not be empty",
        }),
        year: Joi.date().messages({
          "date.base": "year must be a valid date.",
          "any.required": "year is required",
        }),
        from: Joi.string().required().messages({
          "string.base": "from must be a valid  string.",
          "string.empty": "from should not be empty string",
          "any.required": "from is required",
        }),
      })
    )
    .optional(),
});
