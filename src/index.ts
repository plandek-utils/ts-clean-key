/**
 * @ignore
 */
const INVALID_CHARS = /[^0-9a-z\-_]/g;

/**
 * @ignore
 */
const INVALID_CHARS_CASE_INSENSITIVE = /[^0-9A-Za-z\-_]/g;

/**
 * @ignore
 */
const EMPTY = "";

/**
 * @ignore
 */
const MANY_DASHES = /[-]+/g;

/**
 * @ignore
 */
const DASH = "-";

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
  return s.replace(INVALID_CHARS_CASE_INSENSITIVE, EMPTY);
}

export type CleanKeyOptions = { replaceManyDashes?: boolean; caseSensitive?: boolean };

/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_`)
 * It will allow uppercase ascii7 letters if option `caseSensitive` is false
 * It also removes multiple dashes in a row and replaces them for a single dash if the option is given
 *
 * @param s
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.caseSensitive (default `true`)
 * @see cleanKeySimple
 * @see cleanKeySimpleCI
 */
export function cleanKey(s: string, opts: CleanKeyOptions = {}): string {
  const replaceManyDashes = opts.replaceManyDashes ?? true;
  const caseSensitive = opts.caseSensitive ?? true;
  const clean = caseSensitive ? cleanKeySimple(s) : cleanKeySimpleCI(s);
  return replaceManyDashes ? clean.replace(MANY_DASHES, DASH) : clean;
}

/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-` and underscore `_`)
 * It also removes multiple dashes in a row and replaces them for a single dash if the option is given
 *
 * @param s
 * @param opts.replaceManyDashes (default `true`)
 * @see cleanKey
 */
export function cleanKeyCI(s: string, opts: CleanKeyOptions = {}): string {
  return cleanKey(s, { ...opts, caseSensitive: false });
}
