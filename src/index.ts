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
 * Removes bad chars for a string key (all except number, lowcase ascii7 letters, dash `-` and underscore `_`)
 * It also removes multiple dashes in a row and replaces them for a single dash
 *
 * @param s
 */
export function cleanKey(s: string): string {
  return s.replace(INVALID_CHARS, EMPTY).replace(MANY_DASHES, DASH);
}

export default cleanKey;
