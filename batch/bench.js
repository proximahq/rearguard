const Benchmark = require('benchmark');
const {batchLru} = require('./index');

const stack = batchLru(100, 400, () => {});
const arr = Array(150).fill('');

const suite = new Benchmark.Suite();
suite
  .add('batch', function() {
    arr.map(i => stack.add(i));
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })

  .on('error', event => {
    console.log(event);
  })
  // run async
  .run({async: true});
