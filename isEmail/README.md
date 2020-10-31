# @vanguard/is-email.

## Installation.

```bash
npm i @vanguard/is-email
```

## Intro.

`@vanguard/is-email` is a validator for email addresses, it allows checking when an email address is valid, according to [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt)

## Usage.

```javascript
const {isEmail} = require('@vanguard/is-email');

const longemail = new Array(255).fill('a').join();

isEmail(`${longemail}@gmail.com`); // => false
isEmail(`@gmail.com`); // => false
isEmail('hello@gmail.com'); // => false
isEmail('hello@sienna12bourne.ga'); // => true
```

## Benchmarks.

`@vanguard/is-email` is fast and intuitive, you can find benchmarks against similar libraries in the [`/bench`](/bench) folder.

## Tests.

```bash
yarn test
```
