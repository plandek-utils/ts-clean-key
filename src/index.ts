import trim from "lodash.trim";
import parameterize from "parameterize";

/**
 * @internal
 * @ignore
 */
const EMPTY = "";

/**
 * @internal
 * @ignore
 */
const MANY_DASHES = /[-]+/g;

/**
 * @internal
 * @ignore
 */
const DASH = "-";

/**
 * regex to be used for detecting invalid chars for `cleanKeySimple`
 *
 * @see cleanKeySimple()
 */
export const INVALID_CHARS = /[^0-9a-z\-_]/g;

/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleCI`
 *
 * @see cleanKeySimpleCI()
 */
export const INVALID_CHARS_CI = /[^0-9A-Za-z\-_]/g;

/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleWithDots`
 *
 * @see cleanKeySimpleWithDots()
 */
export const INVALID_CHARS_WITH_DOTS = /[^0-9a-z\-_\.]/g;

/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleCIWithDots`
 *
 * @see cleanKeySimpleCIWithDots()
 */
export const INVALID_CHARS_CI_WITH_DOTS = /[^0-9A-Za-z\-_\.]/g;

/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleWithSpecials`
 *
 * @see cleanKeySimpleWithSpecials()
 */
export const INVALID_CHARS_WITH_SPECIALS = /[^0-9a-z\-_\.\/:~\|]/g;

/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleCIWithSpecials`
 *
 * @see cleanKeySimpleCIWithSpecials()
 */
export const INVALID_CHARS_CI_WITH_SPECIALS = /[^0-9A-Za-z\-_\.\/~:\|]/g;

/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_`)
 *
 * @param s
 */
export function cleanKeySimple(s: string): string {
  return s.replace(INVALID_CHARS, EMPTY);
}

/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-` and underscore `_`)
 *
 * @param s
 */
export function cleanKeySimpleCI(s: string): string {
  return s.replace(INVALID_CHARS_CI, EMPTY);
}

/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_` and dot `.`)
 *
 * @param s
 */
export function cleanKeySimpleWithDots(s: string): string {
  return s.replace(INVALID_CHARS_WITH_DOTS, EMPTY);
}

/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-`, underscore `_`, and dot `.`)
 *
 * @param s
 */
export function cleanKeySimpleCIWithDots(s: string): string {
  return s.replace(INVALID_CHARS_CI_WITH_DOTS, EMPTY);
}

/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-`, underscore `_`, dot `.`, pipes `|`, colons `:`, tildes `~`, and slashes `/`)
 *
 * @param s
 */
export function cleanKeySimpleWithSpecials(s: string): string {
  return s.replace(INVALID_CHARS_WITH_SPECIALS, EMPTY);
}

/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-`, underscore `_`, dot `.`, pipes `|`, colons `:`, tildes `~`, and slashes `/`)
 *
 * @param s
 */
export function cleanKeySimpleCIWithSpecials(s: string): string {
  return s.replace(INVALID_CHARS_CI_WITH_SPECIALS, EMPTY);
}

/**
 * signals which characters to allow, not taking into account case sensitivity:
 * - `strict` => `0-9`, `a-z`, `-`, and `_`
 * - `dots` => strict + `.`
 * - `specials` => strict + `.`, `|`, `~`, `/`, and `:`
 */
export enum CharAllowanceMode {
  Strict = "strict",
  Dots = "dots",
  Specials = "specials",
}

/**
 * type with the string values of `CharAllowanceMode`
 * @see CharAllowanceMode
 */
export type CharAllowanceModeEnumValues = "strict" | "dots" | "specials";

export type CleanKeyOptions = {
  prependIfNoLetters?: string;
  trimEdgeDashes?: boolean;
  replaceManyDashes?: boolean;
  caseSensitive?: boolean;
  mode?: CharAllowanceModeEnumValues;
};

/**
 * same as `cleanKey` with the `caseSensitive` option to `true`
 *
 * @param s
 * @param opts
 * @see cleanKey
 */
export function cleanKeyCI(s: string, opts: Omit<CleanKeyOptions, "caseSensitive"> = {}): string {
  return run(s, { ...opts, caseSensitive: false });
}

/**
 * same as `cleanKey` with the `mode` option to `dots`
 *
 * @param s
 * @param opts
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.caseSensitive (default `true`)
 * @see cleanKey
 */
export function cleanKeyWithDots(s: string, opts: Omit<CleanKeyOptions, "mode"> = {}): string {
  return run(s, { ...opts, mode: CharAllowanceMode.Dots });
}

/**
 * same as `cleanKey` with the `mode` option to `dots`, and `caseSensitive` to `true`
 *
 * @param s
 * @param opts
 * @param opts.replaceManyDashes (default `true`)
 * @see cleanKey
 */
export function cleanKeyCIWithDots(s: string, opts: Omit<CleanKeyOptions, "caseSensitive" | "mode"> = {}): string {
  return run(s, { ...opts, caseSensitive: false, mode: CharAllowanceMode.Dots });
}

/**
 * same as `cleanKey` with the `mode` option to `specials`
 *
 * @param s
 * @param opts
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.caseSensitive (default `true`)
 * @see cleanKey
 */
export function cleanKeyWithSpecials(s: string, opts: Omit<CleanKeyOptions, "mode"> = {}): string {
  return run(s, { ...opts, mode: CharAllowanceMode.Specials });
}

/**
 * same as `cleanKey` with the `mode` option to `specials`, and `caseSensitive` to `true`
 *
 * @param s
 * @param opts
 * @param opts.replaceManyDashes (default `true`)
 * @see cleanKey
 */
export function cleanKeyCIWithSpecials(s: string, opts: Omit<CleanKeyOptions, "caseSensitive" | "mode"> = {}): string {
  return run(s, { ...opts, caseSensitive: false, mode: CharAllowanceMode.Specials });
}

/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_`)
 * It will allow uppercase ascii7 letters if option `caseSensitive` is false
 * If the mode is:
 *  - `strict`: it will allow just the standard set (`0-9`, `a-z`, `-`, and `_`)
 *  - `dots` => strict + `.`
 *  - `specials` => strict + `.`, `|`, `~`, `/`, and `:`
 * It also removes multiple dashes in a row and replaces them for a single dash unless option `replaceManyDashes: false` is given
 * If no letters `a-z` or `A-Z` are found, and the option `prependIfNoLetters` is given, it will prepend it to the original string, and clean again.
 * If `trimEdgeDashes` is true, it will trim the edge dashes (`-`) from the beginning and end of the clean string
 *
 * @param s
 * @param opts
 * @param opts.caseSensitive (default `true`)
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.trimEdgeDashes (default `false`)
 * @param opts.prependIfNoLetters (default `undefined`)
 * @param opts.mode (default `strict`)
 */
export function cleanKey(s: string, opts: CleanKeyOptions = {}): string {
  return run(s, opts);
}

/**
 * @internal
 * @hidden
 */
const ANY_LETTERS = /[a-zA-Z]/;

/**
 * @internal
 * @hidden
 */
function run(s: string, opts: CleanKeyOptions = {}): string {
  const replaceManyDashes = opts.replaceManyDashes ?? true;
  const trimEdgeDashes = opts.trimEdgeDashes ?? false;
  const prependIfNoLetters = opts.prependIfNoLetters ?? "";
  const caseSensitive = opts.caseSensitive ?? true;
  const mode = opts.mode ?? CharAllowanceMode.Strict;

  const cleanString = performClean(s, mode, caseSensitive);

  const value = replaceManyDashes ? cleanString.replace(MANY_DASHES, DASH) : cleanString;
  const valueTrimmed = trimEdgeDashes ? trim(value, "-") : value;
  if (prependIfNoLetters && !ANY_LETTERS.test(valueTrimmed)) {
    return run(`${prependIfNoLetters}${s}`, { ...opts, prependIfNoLetters: undefined });
  }
  return valueTrimmed;
}

/**
 * @internal
 * @hidden
 */
function performClean(s: string, mode: CharAllowanceModeEnumValues, caseSensitive: boolean): string {
  if (mode === CharAllowanceMode.Dots) {
    return caseSensitive ? cleanKeySimpleWithDots(s) : cleanKeySimpleCIWithDots(s);
  }

  if (mode === CharAllowanceMode.Specials) {
    return caseSensitive ? cleanKeySimpleWithSpecials(s) : cleanKeySimpleCIWithSpecials(s);
  }

  return caseSensitive ? cleanKeySimple(s) : cleanKeySimpleCI(s);
}

/**
 * For each character in the string that is not one of the safe characters [a-zA-Z0-9],
 * it will replace them with `-HEX_UNICODE_CODE_PADDED_6` (e.g. ' ' => '-000020')
 *
 * @param original
 */
export function processedSafeKey(original: string): string {
  return original.split("").map(processedSafeChar).join("");
}

const PROCESSED_SAFE_CHARS = /[A-Za-z0-9]/;

function processedSafeChar(char: string): string {
  if (PROCESSED_SAFE_CHARS.test(char)) {
    return char;
  }

  const code = char.charCodeAt(0);
  return `-${code.toString(16).toUpperCase().padStart(6, "0")}`;
}

/**
 * First it trims and parameterizes the original string (using the `parameterize` package), and then it cleans it using the `cleanKey` function
 *
 * @param original
 * @param opts
 * @see cleanKey
 */
export function parameterizeAndClean(original: string, opts: CleanKeyOptions = {}): string {
  const key = parameterize(original.trim());
  return cleanKey(key, opts);
}
