import express from "express";
import {
  changeRole,
  getUsers,
  removeUser,
} from "../controllers/userController";
import passport from "passport";

const userRouter = express.Router();

userRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  getUsers
);

userRouter.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  changeRole
);

userRouter.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  removeUser
);

export { userRouter };
