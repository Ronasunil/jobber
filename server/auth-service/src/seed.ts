import { generateUsername } from "unique-username-generator";
import {
  createAuthUser,
  getUserByEmailOrUsername,
} from "@auth/services/authService";
import { faker } from "@faker-js/faker";
import { generateToken } from "@auth/utils/helpers";
import { AuthCreationAttr } from "@auth/interfaces/authInterface";

const getSeedCount = function (): number {
  const count = process.argv[2];
  const parsedCount = count ? +count : 10;
  return parsedCount;
};

const generateUser = function (): AuthCreationAttr {
  const username = generateUsername("-", 0, 4);
  const country = faker.location.country();
  const email = `${username}@gmail.com`;
  const password = "SecurePassword*1";
  const publicId = generateToken();
  const createdAt = new Date();
  const emailVerificationToken = generateToken();

  const authAttrs = {
    username,
    country,
    email,
    password,
    publicId,
    createdAt,
    emailVerificationToken,
  };

  return authAttrs;
};

const createUser = async function () {
  const user = generateUser();
  const userExist = await getUserByEmailOrUsername(user.username, user.email);
  if (userExist) return console.log("User exist");
  try {
    createAuthUser(user);
  } catch (err) {
    console.log(`Error occured:${err}`);
  }
};

const seedUser = async function () {
  const count = getSeedCount();
  const users = Array.from({ length: count }, async () => await createUser());
  console.log(users);
  await Promise.all(users);
};

seedUser();
