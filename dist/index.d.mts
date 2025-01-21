/**
 * port of Django's `URLify` function: https://github.com/django/django/blob/main/django/contrib/admin/static/admin/js/urlify.js
 * @module
 */
/**
 * Converts the string to a valid parameterized-slug: it transliterates, downcases, remove special chars, and replaces spaces with hyphens
 * @param given
 * @returns
 */
declare function parameterize(given: string): string;

/**
 * Inverse of processedSafeKey function
 * @param safeKey
 * @see processedSafeKey
 */
declare function safeKeyToOriginal(safeKey: string): string;
/**
 * For each character in the string that is not one of the safe characters [a-zA-Z0-9],
 * it will replace them with `-HEX_UNICODE_CODE_PADDED_6` (e.g. ' ' => '-000020')
 *
 * @param original
 */
declare function processedSafeKey(original: string): string;

/**
 * regex to be used for detecting invalid chars for `cleanKeySimple`
 *
 * @see cleanKeySimple()
 */
declare const INVALID_CHARS: RegExp;
/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleCI`
 *
 * @see cleanKeySimpleCI()
 */
declare const INVALID_CHARS_CI: RegExp;
/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleWithDots`
 *
 * @see cleanKeySimpleWithDots()
 */
declare const INVALID_CHARS_WITH_DOTS: RegExp;
/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleCIWithDots`
 *
 * @see cleanKeySimpleCIWithDots()
 */
declare const INVALID_CHARS_CI_WITH_DOTS: RegExp;
/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleWithSpecials`
 *
 * @see cleanKeySimpleWithSpecials()
 */
declare const INVALID_CHARS_WITH_SPECIALS: RegExp;
/**
 * regex to be used for detecting invalid chars for `cleanKeySimpleCIWithSpecials`
 *
 * @see cleanKeySimpleCIWithSpecials()
 */
declare const INVALID_CHARS_CI_WITH_SPECIALS: RegExp;
/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_`)
 *
 * @param s
 */
declare function cleanKeySimple(s: string): string;
/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-` and underscore `_`)
 *
 * @param s
 */
declare function cleanKeySimpleCI(s: string): string;
/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-` and underscore `_` and dot `.`)
 *
 * @param s
 */
declare function cleanKeySimpleWithDots(s: string): string;
/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-`, underscore `_`, and dot `.`)
 *
 * @param s
 */
declare function cleanKeySimpleCIWithDots(s: string): string;
/**
 * Removes bad chars for a string key (all except number, lowercase ascii7 letters, dash `-`, underscore `_`, dot `.`, pipes `|`, colons `:`, tildes `~`, hashtags `#`, and slashes `/`)
 *
 * @param s
 */
declare function cleanKeySimpleWithSpecials(s: string): string;
/**
 * Removes bad chars for a string key (all except number, uppercase and lowercase ascii7 letters, dash `-`, underscore `_`, dot `.`, pipes `|`, colons `:`, tildes `~`, hashtags `#`, and slashes `/`)
 *
 * @param s
 */
declare function cleanKeySimpleCIWithSpecials(s: string): string;
/**
 * signals which characters to allow, not taking into account case sensitivity:
 * - `strict` => `0-9`, `a-z`, `-`, and `_`
 * - `dots` => strict + `.`
 * - `specials` => strict + `.`, `|`, `~`, `/`, and `:`
 */
declare enum CharAllowanceMode {
    Strict = "strict",
    Dots = "dots",
    Specials = "specials"
}
/**
 * type with the string values of `CharAllowanceMode`
 * @see CharAllowanceMode
 */
type CharAllowanceModeEnumValues = "strict" | "dots" | "specials";
type CleanKeyOptions = {
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
declare function cleanKeyCI(s: string, opts?: Omit<CleanKeyOptions, "caseSensitive">): string;
/**
 * same as `cleanKey` with the `mode` option to `dots`
 *
 * @param s
 * @param opts
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.caseSensitive (default `true`)
 * @see cleanKey
 */
declare function cleanKeyWithDots(s: string, opts?: Omit<CleanKeyOptions, "mode">): string;
/**
 * same as `cleanKey` with the `mode` option to `dots`, and `caseSensitive` to `true`
 *
 * @param s
 * @param opts
 * @param opts.replaceManyDashes (default `true`)
 * @see cleanKey
 */
declare function cleanKeyCIWithDots(s: string, opts?: Omit<CleanKeyOptions, "caseSensitive" | "mode">): string;
/**
 * same as `cleanKey` with the `mode` option to `specials`
 *
 * @param s
 * @param opts
 * @param opts.replaceManyDashes (default `true`)
 * @param opts.caseSensitive (default `true`)
 * @see cleanKey
 */
declare function cleanKeyWithSpecials(s: string, opts?: Omit<CleanKeyOptions, "mode">): string;
/**
 * same as `cleanKey` with the `mode` option to `specials`, and `caseSensitive` to `true`
 *
 * @param s
 * @param opts
 * @param opts.replaceManyDashes (default `true`)
 * @see cleanKey
 */
declare function cleanKeyCIWithSpecials(s: string, opts?: Omit<CleanKeyOptions, "caseSensitive" | "mode">): string;
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
declare function cleanKey(s: string, opts?: CleanKeyOptions): string;
/**
 * First it trims and parameterizes the original string (using the `parameterize` package), and then it cleans it using the `cleanKey` function
 *
 * @param original
 * @param opts
 * @see cleanKey
 */
declare function parameterizeAndClean(original: string, opts?: CleanKeyOptions): string;

export { CharAllowanceMode, type CharAllowanceModeEnumValues, type CleanKeyOptions, INVALID_CHARS, INVALID_CHARS_CI, INVALID_CHARS_CI_WITH_DOTS, INVALID_CHARS_CI_WITH_SPECIALS, INVALID_CHARS_WITH_DOTS, INVALID_CHARS_WITH_SPECIALS, cleanKey, cleanKeyCI, cleanKeyCIWithDots, cleanKeyCIWithSpecials, cleanKeySimple, cleanKeySimpleCI, cleanKeySimpleCIWithDots, cleanKeySimpleCIWithSpecials, cleanKeySimpleWithDots, cleanKeySimpleWithSpecials, cleanKeyWithDots, cleanKeyWithSpecials, parameterize, parameterizeAndClean, processedSafeKey, safeKeyToOriginal };
