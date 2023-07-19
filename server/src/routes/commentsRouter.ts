import express from "express";
import { createComment, removeComment, updateComment } from "../controllers";
import passport from "passport";

const commentsRouter = express.Router();

commentsRouter.post(
  "/comments/create",
  passport.authenticate("jwt", { session: false }),
  createComment
);

commentsRouter.put(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  updateComment
);

commentsRouter.delete(
  "/comments/:id",
  passport.authenticate("jwt", { session: false }),
  removeComment
);

export { commentsRouter };
