const {download} = require('../../utils');

const urls = ['https://www.myip.ms/files/bots/live_webcrawlers.txt'];

(async () => {
  console.log('> Downloading');
  await Promise.all(urls.map(u => download(u, 'isBot')));
  console.log('> Downloaded');
})();
