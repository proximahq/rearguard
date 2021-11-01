const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

const batchLru = (max, ttl = 0, cb = () => {}, timeout = 1000) => {
  if (!max)
    throw Error('rearguard/batchLru  value, of type number, greater than 0');

  function terminateAfterTimeout() {
    setTimeout(() => {
      process && process.exit(0);
    }, timeout).unref();
  }

  let size = 0;
  let cache = [];
  let ticker;

  const onTick = () => {
    clearInterval(ticker);
  };
  const tick = () => {
    if (size > 0) {
      size = 0;
      cb([...cache]);
      onTick();
      cache.length = 0;
    }
  };

  sigs.forEach(sig => {
    process.once(
      sig,
      () => {
        clearInterval(ticker);
        if (size > 0) {
          cb([...cache]);
        }
        terminateAfterTimeout();
      },
      0,
    );
  });

  return {
    add: value => {
      cache.push(value);
      size++;
      if (size >= max) {
        size = 0;
        cb([...cache]);
        cache.length = 0;
      }
      clearInterval(ticker);
      ticker = setInterval(tick, ttl);
    },
  };
};

module.exports = batchLru;
