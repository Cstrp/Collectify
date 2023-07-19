import express from "express";
import { addTopic, removeTopic } from "../controllers";

const topicRouter = express.Router();

topicRouter.post("/topics", addTopic);
topicRouter.delete("/topics/:topic", removeTopic);

export { topicRouter };
