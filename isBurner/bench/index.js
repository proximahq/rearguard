const Benchmark = require('benchmark');
const emails = require('./emails');
const {isBurner} = require('../dist/index');
const suite = new Benchmark.Suite();
suite
  .add('isBurner', function() {
    emails.map(e => {
      isBurner(e);
    });
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .on('error', event => {
    console.log(event);
  })
  // run async
  .run({async: true});
