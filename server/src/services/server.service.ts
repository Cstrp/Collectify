import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { RouterPaths } from "../types";
import { _passportJwt } from "../middlewares";
import passport from "passport";
import morgan from "morgan";
import { upload } from "../middlewares/upload";
import { uploadImgResp } from "../controllers";
import { searchRouter } from "../routes/searchRouter";
import cron from "node-cron";
import { cleanUpFiles } from "../utils";
import {
  authRouter,
  checkRouter,
  collectionsRouter,
  commentsRouter,
  itemsRouter,
  tagsRouter,
  topicRouter,
  userRouter,
} from "../routes";

const app: Express = express();

app.use(passport.initialize());
app.use(morgan("tiny"));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
_passportJwt(passport);

app.use(RouterPaths.DEFAULT, express.static("static"));
app.use(RouterPaths.DEFAULT, authRouter);
app.use(RouterPaths.DEFAULT, collectionsRouter);
app.use(RouterPaths.DEFAULT, itemsRouter);
app.use(RouterPaths.DEFAULT, commentsRouter);
app.use(RouterPaths.DEFAULT, tagsRouter);
app.use(RouterPaths.DEFAULT, searchRouter);
app.use(RouterPaths.DEFAULT, checkRouter);
app.use(RouterPaths.DEFAULT, userRouter);
app.use(RouterPaths.DEFAULT, topicRouter);
app.post(RouterPaths.UPLOAD, upload.single("image"), uploadImgResp);

cron.schedule("0 */12 * * *", () => {
  cleanUpFiles();
  console.log("Cleaning up files done!");
});

export { app };
