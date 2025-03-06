/**
 * Escapes the characters of the given template string following the rules of
 * [amCharts text styling](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/#Escaping).
 * It replaces curly braces `{` with `{{` and `}` with `}}`, and square brackets `[` with `[[` and `]` with `]]`.
 *
 * Warning: this function is not repeatable, as in you cannot apply it several times. It replaces `{` with `{{` and `}` with `}}`, for example, so if you apply it again, you will get `{{{{` and `}}}}`.
 *
 * @param s The string to escape
 * @returns The escaped string
 */
export function escapeTemplateString(s: string): string {
  return s.replace(/\{/g, "{{").replace(/\}/g, "}}").replace(/\[/g, "[[").replace(/\]/g, "]]");
}
