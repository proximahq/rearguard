import test from 'ava';
import {download} from '../../utils';
import {isBot} from '../src';
import faker from 'faker';

import {readFileSync} from 'fs';
import {join} from 'path';

import crawlers from '../fixtures/crawlers';
import browsers from '../fixtures/browsers';
const url = 'https://www.myip.ms/files/bots/live_webcrawlers.txt';

let filename;
const read = file => readFileSync(join(__dirname, file), 'utf-8');

const generated = Array(10)
  .fill('')
  .map(() => faker.internet.userAgent());

test.before(async () => {
  const name = await download(url, 'isBot');
  filename = name;
});
test('isBot passes generated browsers', t => {
  generated.forEach(ua => {
    t.falsy(isBot(ua), ua);
  });
});

test('isBot passes real browsers', t => {
  browsers.forEach(ua => {
    t.falsy(isBot(ua), ua);
  });
});

test('isBot kills stored crawlers', t => {
  crawlers.forEach((ua, i) => {
    t.truthy(isBot(ua), ua);
  });
});

test('isBot kills live crawlers', t => {
  const liveCrawlers = read(`../tmp/${filename}.txt`)
    .split('\n')
    .map(line => line.split('records - ')[1])
    .filter(Boolean);
  liveCrawlers.forEach(ua => {
    t.truthy(isBot(ua), ua);
  });
});
