import express from "express";
import {
  createCollection,
  getCollections,
  getCollectionsByUserId,
  removeCollection,
  updateCollection,
} from "../controllers";
import passport from "passport";
import { upload } from "../middlewares/upload";

const collectionsRouter = express.Router();

collectionsRouter.get("/collections", getCollections);

collectionsRouter.get(
  "/collection",
  passport.authenticate("jwt", { session: false }),
  getCollectionsByUserId
);

collectionsRouter.post(
  "/collections/create",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createCollection
);

collectionsRouter.put(
  "/collections/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateCollection
);

collectionsRouter.delete(
  "/collections/:id",
  passport.authenticate("jwt", { session: false }),
  removeCollection
);

export { collectionsRouter };
