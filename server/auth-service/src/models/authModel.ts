import { DataTypes, Model, ModelDefined } from "sequelize";
import { hash, compare } from "bcrypt";

import { sequelize } from "@auth/db";
import { AuthCreationAttr, AuthDoc } from "@auth/interfaces/authInterface";
import { config } from "@auth/Config";

const SALT_ROUND = 12;

const AuthModel: ModelDefined<AuthDoc, AuthCreationAttr> = sequelize.define(
  "Auth",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 32],
          msg: "Password must be between 8 and 32 characters long.",
        },
      },

      allowNull: false,
    },

    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: config.DEFAULT_PROFILE_IMG,
    },

    isEmailVerified: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "India",
    },

    passwordResetTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    publicId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        fields: ["email"],
        unique: true,
      },

      {
        fields: ["username"],
        unique: true,
      },

      {
        fields: ["emailVerificationToken"],
        unique: true,
      },
    ],
  }
) as ModelDefined<AuthDoc, AuthCreationAttr>;

AuthModel.addHook("beforeCreate", async function (model: Model<AuthDoc>) {
  const password = model.dataValues.password;
  model.dataValues.password = await hash(password, SALT_ROUND);
});

AuthModel.addHook(
  "beforeUpdate",
  async function (user: Model<AuthDoc, AuthCreationAttr>) {
    const password = user.dataValues.password;
    user.dataValues.password = await hash(password, SALT_ROUND);
  }
);

AuthModel.sync({});
export { AuthModel };
