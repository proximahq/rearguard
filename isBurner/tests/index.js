import test from 'ava';
import {isBurner} from '../src';

test('isBurner', t => {
  t.falsy(isBurner(''));
  t.falsy(isBurner('yo'));
  t.falsy(isBurner('hello@gmail.com'));

  t.truthy(isBurner('hello@email60.com'));
  t.truthy(isBurner('foo@guerrillamail.biz'));
  t.truthy(isBurner('baz@75hosting.net'));
  t.truthy(isBurner('baz+432@bsnow.net'));
});
