const Benchmark = require('benchmark');
const {isEmailBurner} = require('burner-email-providers');

const {isBurner} = require('../dist/index');

const emails = require('./emails');

const suite = new Benchmark.Suite();
suite
  .add('@vanguard/is-burner', function() {
    emails.forEach(e => {
      isBurner(e);
    });
  })
  .add('burner-email-providers', function() {
    emails.forEach(e => {
      isEmailBurner(e);
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
