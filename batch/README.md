# @vanguard/batch.

## Installation.

```bash
npm i @vanguard/batch
```

## Intro.

`@vanguard/batch` is an LRU batching cache mechanism, it allows stacking and progressively releasing an array of data based on ticking mechanism.

## Usage.

```javascript
const {batchLru} = require('@vanguard/batch');

/**
 * max items: 2
 * ttl: 1000ms
 */
const batch = batchLru(2, 1000, items => {
  console.log(items);
});

batch.add(1);
batch.add({foo: 'bar'});

// after 1000ms
// => [1, {foo: 'bar'}]
```

## Tests.

```bash
yarn test
```
