import express from "express";
import {
  createItem,
  deleteItem,
  getItemByCollectionId,
  getItemById,
  getItems,
  likeItem,
  updateItem,
} from "../controllers";
import passport from "passport";
import { upload } from "../middlewares/upload";

const itemsRouter = express.Router();

itemsRouter.get("/items", getItems);
itemsRouter.get("/items/:id", getItemByCollectionId);
itemsRouter.get("/item/:id", getItemById);

itemsRouter.post(
  "/items/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createItem
);

itemsRouter.post(
  "/items/:id/like",
  passport.authenticate("jwt", { session: false }),
  likeItem
);

itemsRouter.put(
  "/items/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateItem
);

itemsRouter.delete(
  "/items/:id",
  passport.authenticate("jwt", { session: false }),
  deleteItem
);

export { itemsRouter };
