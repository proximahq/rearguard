import test from 'ava';
import {isBot} from '../src';
import faker from 'faker';

import {readFileSync} from 'fs';
import {join} from 'path';

import crawlers from '../fixtures/crawlers';
import browsers from '../fixtures/browsers';

const read = file => readFileSync(join(__dirname, file), 'utf-8');

const liveCrawlers = read('../tmp/live_webcrawlers.txt')
  .split('\n')
  .map(line => line.split('records - ')[1])
  .filter(Boolean);

const generated = Array(10)
  .fill('')
  .map(s => faker.internet.userAgent());

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
  liveCrawlers.forEach(ua => {
    t.truthy(isBot(ua), ua);
  });
});
