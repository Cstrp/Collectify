import fs from 'fs';

export const cleanUp = () => {
  const uploadDir = 'uploads/';
  const fileTypes = /\.(png|jpe?g|gif|svg|webp|ico|avif)$/i;

  fs.readdir(uploadDir, (e, f) => {
    if (e) {
      console.log(`Error while readdir: ${e}`);
      return;
    }

    f.forEach(file => {
      if (fileTypes.test(file)) {
        fs.unlink(`${uploadDir}${file}`, e => {
          if (e) {
            console.log(`Error while unlink: ${e}`);

            return;
          }

          console.log(`Files has been removed: ${file.split(' ')}`);
        });
      }
    });
  });
};
