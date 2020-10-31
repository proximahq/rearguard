# @vanguard/is-bot.

## Installation.

```bash
npm i @vanguard/is-bot
```

## Intro.

`@vanguard/is-bot` is a validator for User-Agent strings, it allows efficiently detecting bots, crawlers and scrappers. This library stays up to date with live data provided by [https://www.myip.ms](https://www.myip.ms)

## Usage.

```javascript
const {isBot} = require('@vanguard/is-bot');

isBot(
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
); // false

isBot(
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
); // => false
isBot(
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
); // => true
```

## Benchmarks.

`@vanguard/is-bot` is fast and intuitive, you can find benchmarks against similar libraries in the [`/bench`](/bench) folder.

## Tests.

```bash
yarn test
```
