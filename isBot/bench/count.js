const Benchmark = require('benchmark');
const {isBot: rearguardIsBot} = require('../dist/index');
const isBot = require('isbot');
const isBotFast = require('isbot-fast');

const {readFileSync} = require('fs');
const {join} = require('path');

const read = file => readFileSync(join(__dirname, file), 'utf-8');

const liveCrawlers = read('../tmp/live_webcrawlers.txt')
  .split('\n')
  .map(line => line.split('records - ')[1])
  .filter(Boolean);

const crawlers = require('../fixtures/crawlers');
const browsers = require('../fixtures/browsers');

const count = (cb, name) => {
  console.log(`> Counting for: ${name}`);
  const cr = crawlers.map(e => cb(e)).filter(c => c);
  const li = liveCrawlers.map(e => cb(e)).filter(l => l);
  const br = browsers.map(e => cb(e)).filter(b => !b);
  console.log(`> Found ${cr.length} out of ${crawlers.length} crawlers`);
  console.log(
    `> Found ${li.length} out of ${liveCrawlers.length} live crawlers`,
  );
  console.log(`> Found ${br.length} out of ${browsers.length} valid UAs`);
  console.log(`----------------\n`);
};

count(rearguardIsBot, 'rearguard@is-bot');
count(isBot, 'isbot');
count(isBotFast, 'isbot-fast');
