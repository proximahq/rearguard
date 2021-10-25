/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
type value = string | number | boolean | JsonObject | JsonArray | null;

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
type JsonObject = {[Key in string]?: value};

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
interface JsonArray extends Array<value> {}

declare function batchLru(
  maxItems: number,
  ttl: number,
  callback: (items: JsonArray) => void,
  timeout?: number,
): {
  add: (item: value) => void;
};

// EXPORTS //

export = batchLru;
