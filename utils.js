const http = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, pkg) => {
  const {name, ext} = path.parse(url);
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(
      path.resolve(__dirname, pkg, 'tmp', `${name}.txt`),
      {flags: 'w'},
    );
    let responseSent = false; // flag to make sure that response is sent only once.
    http
      .get(url, response => {
        console.log(`> Validated download ${url}`);
        response.pipe(file);
        file.on('finish', () => {
          console.log(
            `> Download file done ${path.resolve(
              __dirname,
              pkg,
              'tmp',
              `${name}.txt`,
            )}`,
          );
          file.close(() => {
            if (responseSent) return;
            responseSent = true;
            resolve();
          });
        });
      })
      .on('error', err => {
        if (responseSent) return;
        responseSent = true;
        reject(err);
      });
  });
};

module.exports = {download};
