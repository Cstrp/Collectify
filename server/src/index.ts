import { app } from "./services";
import { DB_PASSWORD, DB_USER, PORT } from "./config";
import mongoose from "mongoose";

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rlhd2j8.mongodb.net/`;

(async () => {
  try {
    await mongoose.connect(url, { dbName: "CollectionApp" });

    app.listen(PORT, () =>
      console.log(`Server has been started on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("Unable to connect to the DB | Server", err);
  }
})();

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  process.exit();
});
