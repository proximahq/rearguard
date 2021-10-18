const http = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, pkg) => {
  const {name, ext} = path.parse(url);
  return new Promise((resolve, reject) => {
    let responseSent = false; // flag to make sure that response is sent only once.
    http
      .get(url, response => {
        const _now = Date.now();
        const tmpName = `${name}_${_now}`;
        if (response.statusCode >= 200 && response.statusCode < 300) {
          const file = fs.createWriteStream(
            path.resolve(__dirname, pkg, 'tmp', `${tmpName}.txt`),
            {flags: 'w'},
          );
          console.log(`> Validated download ${url}`);
          response.pipe(file);
          file.on('finish', () => {
            console.log(
              `> Download file done ${path.resolve(
                __dirname,
                pkg,
                'tmp',
                `${tmpName}.txt`,
              )}`,
            );
            file.close(() => {
              if (responseSent) return;
              responseSent = true;
              resolve(tmpName);
            });
          });
        } else if (response.headers.location) {
          resolve(download(response.headers.location, pkg));
        } else {
          reject(new Error(response.statusCode + ' ' + response.statusMessage));
        }
      })
      .on('error', err => {
        if (responseSent) return;
        responseSent = true;
        reject(err);
      });
  });
};

module.exports = {download};
