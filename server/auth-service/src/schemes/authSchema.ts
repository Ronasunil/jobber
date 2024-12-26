import Joi from "joi";

export const signupSchema = Joi.object().keys({
  username: Joi.string().min(3).max(32).required().messages({
    "string.base": "username must be string",
    "string.min": "username must have 3 characters long",
    "string.max": "username must not be more than 32 characters long",
    "string.empty": "username is required field",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "email must be string",
    "string.email": "invalid email",
    "string.empty": "email is required field",
  }),

  password: Joi.string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 8 and 32 characters, contain at least one uppercase letter, and include at least one number",
      "string.empty": "password is required field",
    }),

  country: Joi.string().required().messages({
    "string.base": "country must be string",
    "string.empty": "country is required",
  }),
});

export const loginSchema = Joi.object().keys({
  email: Joi.alternatives().conditional(Joi.string().email(), {
    then: Joi.string().email().required().messages({
      "string.base": "email must be string",
      "string.email": "invalid email",
      "string.empty": "email is required field",
    }),

    otherwise: Joi.string().min(3).max(32).required().messages({
      "string.base": "username must be string",
      "string.min": "username must have 3 characters long",
      "string.max": "username must not be more than 32 characters long",
      "string.empty": "username is required field",
    }),
  }),

  password: Joi.string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 8 and 32 characters, contain at least one uppercase letter, and include at least one number",
      "string.empty": "password is required field",
    }),
});
