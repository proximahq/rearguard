const Benchmark = require('benchmark');
const {isBot: rearguardIsBot} = require('../dist/index');
const isBot = require('isbot');
const isBotFast = require('isbot-fast');

const {readFileSync} = require('fs');
const {join} = require('path');

const crawlers = require('../fixtures/crawlers');
const browsers = require('../fixtures/browsers');

const suite = new Benchmark.Suite();
suite
  .add('rearguard@is-bot', function () {
    crawlers.forEach(e => {
      rearguardIsBot(e);
    });
    browsers.forEach(e => {
      rearguardIsBot(e);
    });
  })
  .add('isBot', function () {
    crawlers.forEach(e => {
      isBot(e);
    });
    browsers.forEach(e => {
      isBot(e);
    });
  })
  .add('isBot-fast', function () {
    crawlers.forEach(e => {
      isBotFast(e);
    });
    browsers.forEach(e => {
      isBotFast(e);
    });
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('error', event => {
    console.log(event);
  })
  .on('complete', function () {
    console.log('\nFastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({async: true});
