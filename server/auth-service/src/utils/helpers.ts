import { config } from "@auth/Config";
import { AuthDoc } from "@auth/interfaces/authInterface";
import { EmailAuth } from "@ronasunil/jobber-shared";
import { randomBytes } from "crypto";
import { addMinutes } from "date-fns";
import { sign } from "jsonwebtoken";

export const generateToken = function (): string {
  const token = randomBytes(15).toString("hex");
  return token;
};

export const signToken = function (result: AuthDoc): string {
  const token = sign(
    {
      id: result.id,
      email: result.email,
      username: result.username,
    },
    config.JWT_SECRET!,
    { expiresIn: "60d" }
  );

  return token;
};

export const addHalfHour = function (): Date {
  const now = new Date();
  const futureTime = addMinutes(now, 30);

  return futureTime;
};

export const getBasePath = function () {
  return "/api/v1/auth";
};
