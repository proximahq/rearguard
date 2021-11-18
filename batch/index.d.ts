declare function batchLru<T>(
  maxItems: number,
  ttl: number,
  callback: (items: T[]) => void,
  timeout?: number,
): {
  add: (item: T) => void;
};

// EXPORTS //

export = batchLru;
