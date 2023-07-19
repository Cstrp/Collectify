import express from "express";
import { getItemTags } from "../controllers";

const tagsRouter = express.Router();

tagsRouter.get("/tags", getItemTags);

export { tagsRouter };
