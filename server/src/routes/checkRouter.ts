import express from "express";
import { checkRole } from "../controllers";
import passport from "passport";

const checkRouter = express.Router();

checkRouter.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  checkRole
);

export { checkRouter };
