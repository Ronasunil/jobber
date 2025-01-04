import Joi from "joi";

export const emailSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "string.base": "email must be string",
    "string.email": "invalid email",
    "string.empty": "email is required field",
  }),
});

export const newPasswordSchema = Joi.object().keys({
  password: Joi.string()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/
    )
    .required()
    .messages({
      "string.base": "password must be string",
      "string.empty": "password is required field",
      "string.pattern.base":
        "Password must be between 8 and 32 characters, contain at least one uppercase letter, and include at least one number",
    }),

  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.base": "password must be string",
    "string.empty": "password is required field",
    "any.only": "passwords should match",
  }),
});

export const changePasswordSchema = Joi.object().keys({
  password: Joi.string()
    .required()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/
    )
    .messages({
      "string.base": "password must be string",
      "string.pattern.base":
        "Password must be between 8 and 32 characters, contain at least one uppercase letter, and include at least one number",
      "string.empty": "password is required field",
    }),
  newPassword: Joi.string()
    .required()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/
    )
    .messages({
      "string.base": "password must be string",
      "string.pattern.base":
        "Password must be between 8 and 32 characters, contain at least one uppercase letter, and include at least one number",
      "string.empty": "password is required field",
    }),

  confirmNewPassword: Joi.string()
    .required()
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/
    )
    .valid(Joi.ref("newPassword"))
    .messages({
      "string.base": "password must be string",
      "string.pattern.base":
        "Password must be between 8 and 32 characters, contain at least one uppercase letter, and include at least one number",
      "string.empty": "password is required field",
      "any.only": "passwords should match",
    }),
});
