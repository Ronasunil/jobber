import { Request, Response } from "express";
import { UploadApiResponse } from "cloudinary";
import httpStatus from "http-status-codes";
import {
  cloudinaryUploader,
  GigUpdateAttrs,
  helpers,
} from "@ronasunil/jobber-shared";

import { updateGig } from "@gig/services/command";

export const update = async function (req: Request, res: Response) {
  const { sellerId, gigId } = req.params as { sellerId: string; gigId: string };
  const body = req.body as GigUpdateAttrs;
  let updatedGig: GigUpdateAttrs;
  let result: UploadApiResponse | undefined;

  if (body.coverImage && !helpers.isBase64(body.coverImage)) {
    result = await cloudinaryUploader.uploadImage(body.coverImage);
  }

  if (result) {
    updatedGig = { ...body, coverImage: result.secure_url };
  } else {
    updatedGig = { ...body };
  }

  await updateGig(sellerId, gigId, updatedGig);

  res.status(httpStatus.OK).json({ message: "Gig updated", updatedGig });
};
