import Joi from "joi";

export const orderCreationSchema = Joi.object({
  sellerId: Joi.string().required().messages({
    "string.base": "sellerId  must be string",
    "string.empty": "sellerId cannot be empty",
    "any.required": "sellerId is required",
  }),

  buyerId: Joi.string().required().messages({
    "string.base": "buyerId  must be string",
    "string.empty": "buyerId cannot be empty",
    "any.required": "buyerId is required",
  }),

  gigId: Joi.string().required().messages({
    "string.base": "gigId  must be string",
    "string.empty": "gigId cannot be empty",
    "any.required": "gigId is required",
  }),

  gigTitle: Joi.string().required().messages({
    "string.base": "gigTitle  must be string",
    "string.empty": "gigTitle cannot be empty",
    "any.required": "gigTitle is required",
  }),

  sellerUsername: Joi.string().required().messages({
    "string.base": "sellerUsername  must be string",
    "string.empty": "sellerUsername cannot be empty",
    "any.required": "sellerUsername is required",
  }),

  receiverUsername: Joi.string().required().messages({
    "string.base": "receiverUsername  must be string",
    "string.empty": "receiverUsername cannot be empty",
    "any.required": "receiverUsername is required",
  }),

  amount: Joi.number().required().messages({
    "number.base": "amount must be a number",
    "any.required": "amount is required",
  }),
  paymentIntent: Joi.string().required().messages({
    "string.base": "paymentIntent  must be string",
    "string.empty": "paymentIntent cannot be empty",
    "any.required": "paymentIntent is required",
  }),
  offer: Joi.object({
    newDeliveryDate: Joi.date().required().min("now").messages({
      "date.base": "newDeliveryDate must be a date",
      "any.required": "newDeliveryDate is required",
      "date.min": "newDeliveryDate must be in the future",
    }),
    oldDeliveryDate: Joi.date()
      .less(Joi.ref("newDeliveryDate"))
      .required()
      .min("now")
      .messages({
        "date.base": "oldDeliveryDate must be a date",
        "any.required": "oldDeliveryDate is required",
        "date.min": "oldDeliveryDate must be in the future",
        "date.less": "oldDeliveryDate cannot be greater than newDeliveryDate",
      }),
    title: Joi.string().required().messages({
      "string.base": "title  must be string",
      "string.empty": "title cannot be empty",
      "any.required": "title is required",
    }),
    deliveryInDays: Joi.number().required().messages({
      "number.base": "deliveryinDays must be a number",
      "any.required": "deliveryInDays is required",
    }),
    reason: Joi.string().required().messages({
      "string.base": "reason  must be string",
      "string.empty": "reason cannot be empty",
      "any.required": "reason is required",
    }),
    price: Joi.number().required().messages({
      "number.base": "price must be a number",
      "any.required": "price is required",
    }),
    accepted: Joi.boolean().optional().messages({
      "boolean.base": "accepted must be a boolean",
    }),
    cancelled: Joi.boolean().optional().messages({
      "boolean.base": "cancelled must be a boolean",
    }),
  })
    .optional()
    .messages({
      "object.base": "offer must be a object",
    }),

  status: Joi.string()
    .valid("Ordered", "Delivered", "Accepted", "Rejected")
    .messages({
      "string.base": "status must be a string",
      "any.required": "status is required",
      "string.valid":
        "status must be one of the following: Ordered, Delivered, Accepted, Rejected",
    }),

  statusChangeTime: Joi.date().optional().messages({
    "date.base": "statusChangeTime must be a date",
  }),

  deliveredFile: Joi.array()
    .items(
      Joi.object({
        file: Joi.string().required().messages({
          "string.base": "file  must be string",
          "string.empty": "file cannot be empty",
          "any.required": "file is required",
        }),
        fileType: Joi.string().required().messages({
          "string.base": "fileType  must be string",
          "string.empty": "fileType cannot be empty",
          "any.required": "fileType is required",
        }),
        fileSize: Joi.string().required().messages({
          "string.base": "fileSize  must be string",
          "string.empty": "fileSize cannot be empty",
          "any.required": "fileSize is required",
        }),
        fileName: Joi.string().required().messages({
          "string.base": "fileName  must be string",
          "string.empty": "fileName cannot be empty",
          "any.required": "fileName is required",
        }),
      })
    )
    .optional()
    .messages({
      "array.base": "deliveredFile must be array",
    }),
});

export const orderUpdateSchema = Joi.object({
  status: Joi.string()
    .valid("Ordered", "Delivered", "Accepted", "Rejected")
    .messages({
      "string.base": "status must be a string",
      "any.required": "status is required",
      "string.valid":
        "status must be one of the following: Ordered, Delivered, Accepted, Rejected",
    })
    .optional(),

  statusChangeTime: Joi.date().optional().messages({
    "date.base": "statusChangeTime must be a date",
  }),

  buyerRating: Joi.object({
    rating: Joi.number().required().messages({
      "number.base": "rating must be a number",
      "any.required": "rating is required",
    }),
    review: Joi.string().required().messages({
      "string.base": "review must be a number",
      "any.required": "review is required",
    }),
  })
    .optional()
    .messages({
      "object.base": "buyerRating must be object",
    }),

  sellerRating: Joi.object({
    rating: Joi.number().required().messages({
      "number.base": "rating must be a number",
      "any.required": "rating is required",
    }),
    review: Joi.string().required().messages({
      "string.base": "review must be a number",
      "any.required": "review is required",
    }),
  })
    .optional()
    .messages({
      "object.base": "sellerRating must be object",
    }),

  extensionRequest: Joi.object({
    oldDeliveryDate: Joi.date().required().messages({
      "date.base": "oldDeliveryDate must be a date",
      "any.required": "oldDeliveryDate is required",
    }),
    newDeliveryDate: Joi.date().required().messages({
      "date.base": "newDeliveryDate must be a date",
      "any.required": "newDeliveryDate is required",
    }),
    reason: Joi.string().required().messages({
      "string.base": "reason must be a string",
      "any.required": "reason is required",
    }),
    rejected: Joi.boolean().required().messages({
      "boolean.base": "rejected must be a boolean",
      "any.required": "rejected is required",
    }),
    accepted: Joi.boolean().required().messages({
      "boolean.base": "accepted must be a boolean",
      "any.required": "accepted is required",
    }),
  }),
});

export const orderDelivery = Joi.object({
  file: Joi.string().required().messages({
    "string.empty": "file cannot be empty",
    "any.required": "file is required",
  }),
});

export const extensionSchema = Joi.object({
  oldDeliveryDate: Joi.date().required().messages({
    "date.base": "oldDeliveryDate must be a date",
    "any.required": "oldDeliveryDate is required",
  }),
  newDeliveryDate: Joi.date().required().messages({
    "date.base": "newDeliveryDate must be a date",
    "any.required": "newDeliveryDate is required",
  }),
  reason: Joi.string().required().messages({
    "string.base": "reason must be a string",
    "any.required": "reason is required",
  }),
  rejected: Joi.boolean().required().messages({
    "boolean.base": "rejected must be a boolean",
    "any.required": "rejected is required",
  }),
  accepted: Joi.boolean().required().messages({
    "boolean.base": "accepted must be a boolean",
    "any.required": "accepted is required",
  }),
});

export const approvalStatusSchema = Joi.object({
  status: Joi.object({
    accepted: Joi.boolean().required().messages({
      "boolean.base": "accepted is required",
      "any.required": "accepted is required",
    }),
    rejected: Joi.boolean().required().messages({
      "boolean.base": "rejected is required",
      "any.required": "rejected is required",
    }),
  }),
});

export const intentSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "email is required",
    "string.email": "Invalid email",
    "string.empty": "email cannot be empty",
  }),
});

export const offerGigSchema = Joi.object({
  offer: Joi.object({
    newDeliveryDate: Joi.date().required().min("now").messages({
      "date.base": "newDeliveryDate must be a date",
      "any.required": "newDeliveryDate is required",
      "date.min": "newDeliveryDate must be in the future",
    }),
    oldDeliveryDate: Joi.date()
      .less(Joi.ref("newDeliveryDate"))
      .required()
      .min("now")
      .messages({
        "date.base": "oldDeliveryDate must be a date",
        "any.required": "oldDeliveryDate is required",
        "date.min": "oldDeliveryDate must be in the future",
        "date.less": "oldDeliveryDate cannot be greater than newDeliveryDate",
      }),
    title: Joi.string().required().messages({
      "string.base": "title  must be string",
      "string.empty": "title cannot be empty",
      "any.required": "title is required",
    }),
    deliveryInDays: Joi.number().required().messages({
      "number.base": "deliveryinDays must be a number",
      "any.required": "deliveryInDays is required",
    }),
    reason: Joi.string().required().messages({
      "string.base": "reason  must be string",
      "string.empty": "reason cannot be empty",
      "any.required": "reason is required",
    }),
    price: Joi.number().required().messages({
      "number.base": "price must be a number",
      "any.required": "price is required",
    }),
    accepted: Joi.boolean().optional().messages({
      "boolean.base": "accepted must be a boolean",
    }),
    cancelled: Joi.boolean().optional().messages({
      "boolean.base": "cancelled must be a boolean",
    }),
  })
    .required()
    .messages({
      "object.base": "offer must be a object",
    }),
});
