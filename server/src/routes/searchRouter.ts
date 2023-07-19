import express from "express";
import { globalSearch } from "../controllers/searchController";

const searchRouter = express.Router();

searchRouter.get("/search", globalSearch);

export { searchRouter };
