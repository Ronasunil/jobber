import { AuthCreationAttr, AuthDoc } from "@auth/interfaces/authInterface";
import { AuthModel } from "@auth/models/authModel";

import { Op } from "sequelize";

export const createAuthUser = async function (data: AuthCreationAttr) {
  const authUser = await AuthModel.create(data);

  //TODO produce event for buyer creation

  return authUser.dataValues;
};

export const getUserById = async function (
  id: number
): Promise<AuthDoc | undefined> {
  const authDoc = await AuthModel.findOne({ where: { id } });
  return authDoc?.dataValues;
};

export const getUserByEmail = async function (
  email: string
): Promise<AuthDoc | undefined> {
  const authDoc = await AuthModel.findOne({ where: { email } });
  return authDoc?.dataValues;
};

export const getUserByEmailOrUsername = async function (
  username: string,
  email: string
): Promise<AuthDoc | undefined> {
  const authDoc = await AuthModel.findOne({
    where: { [Op.or]: { username, email } },
  });

  return authDoc?.dataValues;
};

export const getUserByEmailVerificationToken = async function (
  token: string
): Promise<AuthDoc | undefined> {
  const authDoc = await AuthModel.findOne({
    where: { emailVerificationToken: token },
  });

  return authDoc?.dataValues;
};

export const getUserByPasswordResetToken = async function (
  email: string,
  token: string
): Promise<AuthDoc | undefined> {
  const authDoc = await AuthModel.findOne({
    where: {
      email,
      passwordResetToken: token,
      passwordResetTokenExpires: { [Op.gt]: new Date() },
    },
  });
  return authDoc?.dataValues;
};

export const updatePassword = async function (
  id: number,
  password: string,
  passwordResetTokenExpires: Date | undefined
) {
  await AuthModel.update(
    { password, passwordResetToken: "", passwordResetTokenExpires },
    { where: { id }, individualHooks: true }
  );
};

export const updateEmailVerificationToken = async function (
  email: string,
  tokenValue: string,
  isVerified: number
) {
  await AuthModel.update(
    {
      emailVerificationToken: tokenValue,
      isEmailVerified: isVerified,
    },
    { where: { email } }
  );
};

export const updatePasswordResetToken = async function (
  token: string,
  email: string,
  date: Date
) {
  await AuthModel.update(
    { passwordResetToken: token, passwordResetTokenExpires: date },
    { where: { email } }
  );
};
