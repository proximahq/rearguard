declare function batchLru(
  maxItems: number,
  ttl: number,
  callback: (any) => any,
  timeout?: number,
): boolean;

// EXPORTS //

export = batchLru;
