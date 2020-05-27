/**
 * @ignore
 */
const INVALID_CHARS = /[^0-9a-z\-_]/g;

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
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_`)
 * It also removes multiple dashes in a row and replaces them for a single dash if the option is given
 *
 * @param s
 * @param opts.replaceManyDashes (default `true`)
 * @see cleanKeySimple
 */
export function cleanKey(s: string, opts: { replaceManyDashes: boolean } = { replaceManyDashes: true }): string {
  const clean = cleanKeySimple(s);
  return opts.replaceManyDashes ? clean.replace(MANY_DASHES, DASH) : clean;
}
