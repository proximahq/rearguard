const fs = require('fs');
const path = require('path');

const getAllFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(__dirname, '..', 'tmp'), (err, files) => {
      if (err) {
        reject();
        return;
      }
      const txtFiles = files.map(f => path.join(__dirname, '..', 'tmp', f));
      resolve(txtFiles);
    });
  });
};

(async () => {
  try {
    const files = await getAllFiles();
    const txt = files.filter(filename => filename.endsWith('.txt'));
    console.log(`> files to delete ${txt}`);
    await Promise.all(
      txt.map(
        file =>
          new Promise((res, rej) => {
            try {
              fs.unlink(file, err => {
                if (err) throw err;
                console.log(`> ${file} was deleted`);
              });
            } catch (e) {
              rej(e);
            }
          }),
      ),
    );
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
