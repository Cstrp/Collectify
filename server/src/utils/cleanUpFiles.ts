import * as fs from "fs";

export const cleanUpFiles = () => {
  const uploadDirectory = "static/";

  const fileTypes = /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i;

  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      console.error("Error while readdir:", err);
      return;
    }

    files.forEach(file => {
      if (fileTypes.test(file)) {
        fs.unlink(`${uploadDirectory}/${file}`, err => {
          if (err) {
            console.error("Error removing:", err);
            return;
          }
          console.log(`File has been removed: ${file}`);
        });
      }
    });
  });
};
