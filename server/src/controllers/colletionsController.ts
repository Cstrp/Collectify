import { Request, Response } from "express";
import { errorHandler } from "../utils";
import Collections from "../models/collection";
import { User } from "../types";
import Item from "../models/item";

const getCollectionsByUserId = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    if (!user) {
      errorHandler(res, 404, "User not found");
      return;
    }

    const collection = await Collections.find({ userId: user._id }).exec();

    if (!collection) {
      errorHandler(res, 404, "Collection not found");
      return;
    }

    res.status(200).json({ collection });
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

const getCollections = async (req: Request, res: Response) => {
  try {
    const collections = await Collections.find().populate("items").exec();

    collections.sort((a, b) => b.items.length - a.items.length);

    res.status(200).json({ collections });
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

const createCollection = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const { name, description, theme, image, fields } = req.body;

    await new Collections({
      userId: user._id,
      name,
      description,
      theme,
      image,
      fields,
    }).save();

    res.status(201).json({ message: "New collection has been created!" });
  } catch (err) {
    errorHandler(res, 500, `Internal Server Error: ${err}`);
  }
};

const updateCollection = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const updatedCollection = await Collections.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: user._id,
      },
      { $set: req.body },
      { new: true }
    );

    if (!updatedCollection) {
      errorHandler(res, 404, "Collection not found & not updated");
    }

    res.status(200).json({ message: "Collection has been updated!" });
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

const removeCollection = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const collection = await Collections.findOne({
      _id: req.params.id,
      userId: user._id,
    });

    if (collection) {
      collection.deleteOne();
      await Item.deleteMany({
        collectionId: req.params.id,
      });

      res.status(200).json({ message: "Collection has been deleted" });
    } else {
      errorHandler(res, 404, "Collection not found & not removed!");
    }
  } catch (error) {
    errorHandler(res, 500, `Internal Server Error ${error}`);
  }
};

export {
  getCollections,
  getCollectionsByUserId,
  createCollection,
  updateCollection,
  removeCollection,
};
