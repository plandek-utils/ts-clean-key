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
const INVALID_CHARS_WITH_DOTS = /[^0-9a-z\-_\.]/g;

/**
 * @ignore
 */
const INVALID_CHARS_CASE_INSENSITIVE_WITH_DOTS = /[^0-9A-Za-z\-_\.]/g;

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

/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_` and dot `.`)
 *
 * @param s
 */
export function cleanKeySimpleWithDots(s: string): string {
  return s.replace(INVALID_CHARS_WITH_DOTS, EMPTY);
}

/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-` and underscore `_` and dot `.`)
 *
 * @param s
 */
export function cleanKeySimpleCIWithDots(s: string): string {
  return s.replace(INVALID_CHARS_CASE_INSENSITIVE_WITH_DOTS, EMPTY);
}

/**
 * @internal
 * @hidden
 */
function clean(s: string, allowDots: boolean, caseSensitive: boolean): string {
  if (allowDots) {
    return caseSensitive ? cleanKeySimpleWithDots(s) : cleanKeySimpleCIWithDots(s);
  }

  return caseSensitive ? cleanKeySimple(s) : cleanKeySimpleCI(s);
}

export type CleanKeyOptions = { replaceManyDashes?: boolean; caseSensitive?: boolean; allowDots?: boolean };

/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_`)
 * It will allow uppercase ascii7 letters if option `caseSensitive` is false
 * It will allow dot `.` if option `allowDots` is true
 * It also removes multiple dashes in a row and replaces them for a single dash unless option `replaceManyDashes: false` is given
 *
 * @param s
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.caseSensitive (default `true`)
 * @param opts.allowDots (default `false`)
 * @see cleanKeySimple
 * @see cleanKeySimpleCI
 * @see cleanKeySimpleWithDots
 * @see cleanKeySimpleCIWithDots
 */
export function cleanKey(s: string, opts: CleanKeyOptions = {}): string {
  const replaceManyDashes = opts.replaceManyDashes ?? true;
  const caseSensitive = opts.caseSensitive ?? true;
  const allowDots = opts.allowDots ?? false;
  const cleanString = clean(s, allowDots, caseSensitive);
  return replaceManyDashes ? cleanString.replace(MANY_DASHES, DASH) : cleanString;
}

/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-` and underscore `_`)
 * It also removes multiple dashes in a row and replaces them for a single dash unless option `replaceManyDashes: false` is given
 *
 * @param s
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.allowDots (default `false`)
 * @see cleanKey
 */
export function cleanKeyCI(s: string, opts: Omit<CleanKeyOptions, "caseSensitive"> = {}): string {
  return cleanKey(s, { ...opts, caseSensitive: false });
}

/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_` and dot `.`)
 * It also removes multiple dashes in a row and replaces them for a single dash unless option `replaceManyDashes: false` is given
 * It will allow uppercase ascii7 letters if option `caseSensitive: false` is given
 *
 * @param s
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.caseSensitive (default `true`)
 * @see cleanKey
 */
export function cleanKeyWithDots(s: string, opts: Omit<CleanKeyOptions, "allowDots"> = {}): string {
  return cleanKey(s, { ...opts, allowDots: true });
}

/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-` and underscore `_` and dot `.`)
 * It also removes multiple dashes in a row and replaces them for a single dash unless option `replaceManyDashes: false` is given
 *
 * @param s
 * @param opts.replaceManyDashes (default `true`)
 * @see cleanKey
 */
export function cleanKeyCIWithDots(s: string, opts: Omit<CleanKeyOptions, "caseSensitive" | "allowDots"> = {}): string {
  return cleanKey(s, { ...opts, caseSensitive: false, allowDots: true });
}
