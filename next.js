const {nextStandardVersion} = require('next-standard-version');
const fs = require('fs');
const path = require('path');

nextStandardVersion({
  modulePath: './node_modules/standard-version',
})
  .then(version => {
    fs.writeFileSync(path.resolve(__dirname, 'VERSION'), version);
  })
  .catch(error => {});
