const Benchmark = require('benchmark');
const isEmail = require('../dist/index');
const faker = require('faker');

const fakeEmails = new Array(100).fill('').map(() => faker.internet.email());
const suite = new Benchmark.Suite();

suite
  .add('rearguard@is-email', function () {
    fakeEmails.forEach(e => {
      isEmail(e);
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
