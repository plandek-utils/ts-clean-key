/**
 * Inverse of processedSafeKey function
 * @param safeKey
 * @see processedSafeKey
 */
export function safeKeyToOriginal(safeKey: string): string {
  return safeKey.replace(RE, (_match, code) => {
    return String.fromCharCode(Number.parseInt(code, 16));
  });
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

const RE = /-([0-9A-F]{6})/g;
