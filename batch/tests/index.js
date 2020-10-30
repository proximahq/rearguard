import test from 'ava';
import {batchLru} from '../';

const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

test.serial('batchLru gets invoked', t => {
  t.plan(1);
  const batch = batchLru(2, 1000, () => {
    t.pass();
  });
  batch.add(1);
  batch.add(2);
});

test.serial('batchLru gets released on max size', t => {
  t.plan(1);
  const batch = batchLru(2, 1000, v => {
    t.deepEqual(v, [1, 2]);
  });
  batch.add(1);
  batch.add(2);
});

test.serial('batchLru gets released on ttl', async t => {
  t.plan(2);
  let first = false;
  const batch = batchLru(10, 100, v => {
    if (first) {
      t.deepEqual(v, [{foo: 'bar'}, 'this is a string', 1024]);
    } else {
      t.deepEqual(v, ['foo', 'bar', 'buz']);
      first = true;
    }
  });
  batch.add('foo');
  batch.add('bar');
  batch.add('buz');
  await wait(200);

  batch.add({foo: 'bar'});
  batch.add('this is a string');
  batch.add(1024);
  await wait(200);
});
