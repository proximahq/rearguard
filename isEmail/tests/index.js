import test from 'ava';
import isEmail from '../src';

test('isEmail', t => {
  const longemail = new Array(255).fill('a').join();
  t.falsy(isEmail(''));
  t.falsy(isEmail());
  t.falsy(isEmail(`${longemail}@gmail.com`));
  t.falsy(isEmail(`@gmail.com`));
  t.truthy(isEmail('hello@gmail.com'));
  t.truthy(isEmail('hello@gmail.co.uk'));
  t.truthy(isEmail('hello@sienna12bourne.ga'));
  t.truthy(isEmail('bar@mail2000.ml'));
  t.truthy(isEmail('a@b.com'));
  t.truthy(isEmail('valid@about.museum'));
  t.truthy(isEmail('test123@hello.museum'));
  t.truthy(isEmail('test-----123@hello.museum'));
  t.truthy(isEmail('~@iana.org'));
  t.truthy(isEmail('theoooodore+123@hello.org'));
  t.truthy(isEmail('first.last@123.iana.org	'));
});
