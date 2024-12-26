import { Model, Optional } from "sequelize";

export interface AuthAttrs {
  id?: number;
  username: string;
  email: string;
  password: string;
  isEmailVerified?: number;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
  createdAt?: Date;
  profilePhoto?: string;
  country: string;
  publicId?: string;
  comparePassword?(password: string, hash: string): Promise<boolean>;
  hashPassword?(password: string): Promise<string>;
}

export interface AuthInput {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  publicId: string;
  emailVerificationToken: string;
  country: string;
}

export interface AuthDoc {
  id: number;
  username: string;
  email: string;
  password: string;
  isEmailVerified: number;
  emailVerificationToken: string;
  passwordResetToken: string;
  passwordResetTokenExpires: Date;
  createdAt: Date;
  profilePhoto: string;
  country: string;
  publicId: string;
}

export interface AuthModelInstanceMethods extends Model {
  prototype: {
    comparePassword(password: string, hash: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
  };
}

export type AuthCreationAttr = Optional<
  AuthAttrs,
  "id" | "createdAt" | "passwordResetToken" | "passwordResetTokenExpires"
>;
