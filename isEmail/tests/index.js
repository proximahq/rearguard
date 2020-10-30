import test from 'ava';
import {isEmail} from '../src';

test('isEmail', t => {
  const longemail = new Array(255).fill('a').join();
  t.falsy(isEmail(''));
  t.falsy(isEmail());
  t.falsy(isEmail(`${longemail}@gmail.com`));
  t.falsy(isEmail(`@gmail.com`));
  t.truthy(isEmail('hello@gmail.com'));
  t.truthy(isEmail('hello@sienna12bourne.ga'));
  t.truthy(isEmail('bar@mail2000.ml'));
});
