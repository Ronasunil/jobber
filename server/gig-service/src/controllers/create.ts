import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import {
  BadRequest,
  cloudinaryUploader,
  GigCreationAttrs,
} from "@ronasunil/jobber-shared";

import { createGig } from "@gig/services/command";

export const create = async function (req: Request, res: Response) {
  const body = req.body as GigCreationAttrs;
  const { coverImage } = body;

  try {
    const result = await cloudinaryUploader.uploadImage(coverImage);
    if (!result?.public_id)
      throw new BadRequest(
        "Image upload went wrong try again",
        "Gig service create():"
      );

    const gig: GigCreationAttrs = { ...body, coverImage: result.secure_url };
    await createGig(gig);

    res.status(httpStatus.OK).json({ message: "Gig created", gig });
  } catch (err) {
    console.log(err);
  }
};
