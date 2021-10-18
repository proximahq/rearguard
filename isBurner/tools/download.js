const fs = require('fs');
const dns = require('dns');
const path = require('path');
const Queue = require('queue-promise');
const {download} = require('../../utils');

const MAX = 20 * 16 * 50 * 50;

const queue = new Queue({concurrent: MAX, interval: Infinity});

const urls = [
  'https://raw.githubusercontent.com/wesbos/burner-email-providers/master/emails.txt',
  'https://raw.githubusercontent.com/fnando/email_data/main/data/disposable_domains.txt',
  'https://raw.githubusercontent.com/findie/burner-email-providers/master/emails.txt',
  'https://raw.githubusercontent.com/justinlosh/burner-email-providers/master/full-list.txt',
  'https://raw.githubusercontent.com/Xyborg/disposable-burner-email-providers/master/disposable-domains.txt',
  'https://raw.githubusercontent.com/FugaCloud/email-domain-lists/master/burner-emails.txt',
  'https://gist.githubusercontent.com/adamloving/4401361/raw/temporary-email-address-domains',
  'https://gist.githubusercontent.com/michenriksen/8710649/raw/disposable-email-provider-domains',
];

const getAllFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve(__dirname, '..', 'tmp'), (err, files) => {
      if (err) {
        reject();
        return;
      }
      const txtFiles = files.map(f => path.join(__dirname, '..', 'tmp', f));
      resolve(txtFiles);
    });
  });
};

const read = file =>
  fs
    .readFileSync(file)
    .toString()
    .toLowerCase()
    .trim()
    .toLowerCase()
    .split('\n')
    .map(s => s.trim())
    .filter(s => s !== '');

const write = (file, content) =>
  fs.writeFileSync(
    path.resolve(__dirname, '..', 'src', file),
    `export const list = new Set(${JSON.stringify(content)});`,
  );

const validateMx = domain => {
  return new Promise((resolve, reject) => {
    dns.resolveMx(domain, (err, mx) => {
      if (typeof mx != 'undefined') {
        mx
          ? resolve({isValid: true, domain, mxArray: mx})
          : resolve({isValid: false, domain, mxArray: null});
      } else if (err.code == 'ENOTFOUND') {
        resolve({
          isValid: false,
          domain,
          mxArray: null,
          mxRecordSetExists: false,
        });
      } else {
        resolve({isValid: false, domain});
      }
    });
  });
};

const asyncFilter = async (arr, predicate) =>
  arr.reduce(
    async (memo, e) => ((await predicate(e)) ? [...(await memo), e] : memo),
    [],
  );

const isDone = () =>
  new Promise((res, rej) => {
    queue.on('end', () => res());
  });

(async () => {
  try {
    const previousCount = parseInt(
      fs.readFileSync(path.resolve(__dirname, '..', 'COUNT.TXT')).toString(),
    );

    // Download all files from resources
    console.log('> Downloading');
    const filesToDownload = await Promise.all(
      urls.map(u => download(u, 'isBurner')),
    );
    console.log('> Downloaded');

    const files = await getAllFiles();

    let burners = [];
    let content = [];
    files.forEach(file => {
      content = read(file);
      burners = Array.from(new Set(content.concat(burners)));
    });

    burners = [...new Set(burners)];
    const originalsize = burners.length;
    console.log(`> Burners: ${originalsize}`);

    console.log(`> Validate active addresss`);

    let invalidSize = 0;
    let validSize = 0;
    let tmp;
    let validBurners = [];
    let slice = [];

    for (const burn of burners) {
      queue.enqueue(() => validateMx(burn));
    }

    queue.on('resolve', b => {
      if (!b.isValid) {
        invalidSize++;
        // Keep logs plain
      } else {
        validBurners.push(b.domain);
        validSize++;
      }
      console.clear();
      console.log(
        `Checked ${
          validSize + invalidSize
        }/${originalsize}  (valid: ${validSize})`,
      );
    });

    await isDone();

    console.log('> Done validating mx');

    console.log(
      `> Validated active burners: ${validBurners.length}/${originalsize}`,
    );
    write(`list.js`, validBurners);
    console.log('> Saved list');
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'COUNT.TXT'),
      `${validBurners.length}`,
    );

    if (previousCount !== validBurners.length) {
      // proceed with the rest of the circleci steps
      console.log('> Burner providers changed, proceed with release');
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
