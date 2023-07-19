import { Request, Response } from "express";
import * as fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../../static/listOfCollectibles.txt");

const addTopic = (req: Request, res: Response) => {
  const { topic } = req.body;

  const topics = fs.readFileSync(filePath, "utf-8").split("\n");

  topics.splice(-1, 0, topic);
  fs.writeFileSync(filePath, topics.join("\n"));

  res.status(200).json({ message: "New  topic added successfully!" });
};

const removeTopic = (req: Request, res: Response) => {
  const { topic } = req.params;
  const topics = fs.readFileSync(filePath, "utf-8").split("\n");
  const idx = topics.indexOf(topic);

  if (idx !== -1) {
    topics.splice(idx, 1);
    fs.writeFileSync(filePath, topics.join("\n"));
    res.status(200).json({ message: "Topic removed successfully!" });
  } else {
    res.status(404).json({ message: "Topic not found!" });
  }
};

export { addTopic, removeTopic };
