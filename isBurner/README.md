# @rearguard/is-burner.

## Installation.

```bash
npm i @rearguard/is-burner
```

## Intro.

`@rearguard/is-burner` is a validator for email addresses, it validates that an email adress is not coming from a disposable email provider. Stays automatically up to date with live lists of disposable email providers.

## Usage.

```javascript
const {isBurner} = require('@rearguard/is-burner');

isBurner('test@gmail.com'); // false
isBurner('test@yahoo.com'); // false
isBurner('bar@22pesok.ru'); // true
isBurner('test@zapzap.rent'); // true
```

## Benchmarks.

`@rearguard/is-burner` is fast and intuitive, you can find benchmarks against similar libraries in the [`/bench`](/bench) folder.

## Tests.

```bash
yarn test
```
