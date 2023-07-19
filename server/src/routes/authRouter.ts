import express from "express";
import { signIn, signUp } from "../controllers";
import { RouterPaths } from "../types";

const authRouter = express.Router();

authRouter.post(RouterPaths.REGISTER, signUp);
authRouter.post(RouterPaths.LOGIN, signIn);

export { authRouter };
