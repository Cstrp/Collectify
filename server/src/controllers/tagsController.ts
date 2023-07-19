import { Request, Response } from "express";
import Item from "../models/item";
import { errorHandler } from "../utils";

const getItemTags = async (req: Request, res: Response) => {
  try {
    const tags = await Item.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: null, tags: { $addToSet: "$tags" } } },
      { $project: { _id: 0, tags: 1 } },
    ]);

    if (tags.length === 0) {
      errorHandler(res, 404, "Tags not found");
      return;
    }

    res.status(200).json(tags[0].tags);
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

export { getItemTags };
