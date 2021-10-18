declare function batchLru(
  maxItems: number,
  ttl: number,
  callback: () => void,
  timeout?: number,
): boolean;

// EXPORTS //

export = batchLru;
