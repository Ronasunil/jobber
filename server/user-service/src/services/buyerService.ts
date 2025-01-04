import { RabbitUserPayload } from "@ronasunil/jobber-shared";
import { BuyerDoc } from "@user/interfaces/buyerInterface";
import { BuyerModel } from "@user/models/buyerModel";

export const createBuyer = async function (data: RabbitUserPayload) {
  const { country, email, profilePhoto, username } = data;
  await BuyerModel.create({ country, email, profilePhoto, username });
};

export const getBuyerByUsername = async function (
  username: string
): Promise<BuyerDoc | null> {
  const user = await BuyerModel.findOne({ username });
  return user;
};

export const getBuyerById = async function (
  buyerId: string
): Promise<BuyerDoc | null> {
  const user = await BuyerModel.findById(buyerId);
  return user;
};

export const getBuyerByEmail = async function (
  email: string
): Promise<BuyerDoc | null> {
  const user = await BuyerModel.findOne({ email });
  return user;
};

export const updateToSeller = async function (
  buyerId: string
): Promise<BuyerDoc | null> {
  const user = await BuyerModel.findByIdAndUpdate(
    buyerId,
    { isBuyer: false },
    { new: true, runValidators: true }
  );

  return user;
};

export const addItemToPurchasedGigs = async function (
  buyerId: string,
  item: string
) {
  await BuyerModel.findByIdAndUpdate(buyerId, {
    $push: { purchasedGigs: item },
  });
};

export const removeItemFromPurchasedGigs = async function (
  buyerId: string,
  item: string
) {
  await BuyerModel.findByIdAndUpdate(buyerId, {
    $pull: { purchasedGigs: item },
  });
};
