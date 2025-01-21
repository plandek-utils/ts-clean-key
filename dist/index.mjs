// src/parameterize.ts
function parameterize(given) {
  let s = downcode(given);
  s = s.toLowerCase();
  s = s.replace(/[^-\w\s]/g, "");
  s = s.replace(/^\s+|\s+$/g, "");
  s = s.replace(/[-\s]+/g, "-");
  return s.substring(0);
}
var LATIN_MAP = {
  \u00C0: "A",
  \u00C1: "A",
  \u00C2: "A",
  \u00C3: "A",
  \u00C4: "A",
  \u00C5: "A",
  \u00C6: "AE",
  \u00C7: "C",
  \u00C8: "E",
  \u00C9: "E",
  \u00CA: "E",
  \u00CB: "E",
  \u00CC: "I",
  \u00CD: "I",
  \u00CE: "I",
  \u00CF: "I",
  \u00D0: "D",
  \u00D1: "N",
  \u00D2: "O",
  \u00D3: "O",
  \u00D4: "O",
  \u00D5: "O",
  \u00D6: "O",
  \u0150: "O",
  \u00D8: "O",
  \u00D9: "U",
  \u00DA: "U",
  \u00DB: "U",
  \u00DC: "U",
  \u0170: "U",
  \u00DD: "Y",
  \u00DE: "TH",
  \u0178: "Y",
  \u00DF: "ss",
  \u00E0: "a",
  \u00E1: "a",
  \u00E2: "a",
  \u00E3: "a",
  \u00E4: "a",
  \u00E5: "a",
  \u00E6: "ae",
  \u00E7: "c",
  \u00E8: "e",
  \u00E9: "e",
  \u00EA: "e",
  \u00EB: "e",
  \u00EC: "i",
  \u00ED: "i",
  \u00EE: "i",
  \u00EF: "i",
  \u00F0: "d",
  \u00F1: "n",
  \u00F2: "o",
  \u00F3: "o",
  \u00F4: "o",
  \u00F5: "o",
  \u00F6: "o",
  \u0151: "o",
  \u00F8: "o",
  \u00F9: "u",
  \u00FA: "u",
  \u00FB: "u",
  \u00FC: "u",
  \u0171: "u",
  \u00FD: "y",
  \u00FE: "th",
  \u00FF: "y"
};
var LATIN_SYMBOLS_MAP = {
  "\xA9": "(c)"
};
var GREEK_MAP = {
  \u03B1: "a",
  \u03B2: "b",
  \u03B3: "g",
  \u03B4: "d",
  \u03B5: "e",
  \u03B6: "z",
  \u03B7: "h",
  \u03B8: "8",
  \u03B9: "i",
  \u03BA: "k",
  \u03BB: "l",
  \u03BC: "m",
  \u03BD: "n",
  \u03BE: "3",
  \u03BF: "o",
  \u03C0: "p",
  \u03C1: "r",
  \u03C3: "s",
  \u03C4: "t",
  \u03C5: "y",
  \u03C6: "f",
  \u03C7: "x",
  \u03C8: "ps",
  \u03C9: "w",
  \u03AC: "a",
  \u03AD: "e",
  \u03AF: "i",
  \u03CC: "o",
  \u03CD: "y",
  \u03AE: "h",
  \u03CE: "w",
  \u03C2: "s",
  \u03CA: "i",
  \u03B0: "y",
  \u03CB: "y",
  \u0390: "i",
  \u0391: "A",
  \u0392: "B",
  \u0393: "G",
  \u0394: "D",
  \u0395: "E",
  \u0396: "Z",
  \u0397: "H",
  \u0398: "8",
  \u0399: "I",
  \u039A: "K",
  \u039B: "L",
  \u039C: "M",
  \u039D: "N",
  \u039E: "3",
  \u039F: "O",
  \u03A0: "P",
  \u03A1: "R",
  \u03A3: "S",
  \u03A4: "T",
  \u03A5: "Y",
  \u03A6: "F",
  \u03A7: "X",
  \u03A8: "PS",
  \u03A9: "W",
  \u0386: "A",
  \u0388: "E",
  \u038A: "I",
  \u038C: "O",
  \u038E: "Y",
  \u0389: "H",
  \u038F: "W",
  \u03AA: "I",
  \u03AB: "Y"
};
var TURKISH_MAP = {
  \u015F: "s",
  \u015E: "S",
  \u0131: "i",
  \u0130: "I",
  \u00E7: "c",
  \u00C7: "C",
  \u00FC: "u",
  \u00DC: "U",
  \u00F6: "o",
  \u00D6: "O",
  \u011F: "g",
  \u011E: "G"
};
var ROMANIAN_MAP = {
  \u0103: "a",
  \u00EE: "i",
  \u0219: "s",
  \u021B: "t",
  \u00E2: "a",
  \u0102: "A",
  \u00CE: "I",
  \u0218: "S",
  \u021A: "T",
  \u00C2: "A"
};
var RUSSIAN_MAP = {
  \u0430: "a",
  \u0431: "b",
  \u0432: "v",
  \u0433: "g",
  \u0434: "d",
  \u0435: "e",
  \u0451: "yo",
  \u0436: "zh",
  \u0437: "z",
  \u0438: "i",
  \u0439: "j",
  \u043A: "k",
  \u043B: "l",
  \u043C: "m",
  \u043D: "n",
  \u043E: "o",
  \u043F: "p",
  \u0440: "r",
  \u0441: "s",
  \u0442: "t",
  \u0443: "u",
  \u0444: "f",
  \u0445: "h",
  \u0446: "c",
  \u0447: "ch",
  \u0448: "sh",
  \u0449: "sh",
  \u044A: "",
  \u044B: "y",
  \u044C: "",
  \u044D: "e",
  \u044E: "yu",
  \u044F: "ya",
  \u0410: "A",
  \u0411: "B",
  \u0412: "V",
  \u0413: "G",
  \u0414: "D",
  \u0415: "E",
  \u0401: "Yo",
  \u0416: "Zh",
  \u0417: "Z",
  \u0418: "I",
  \u0419: "J",
  \u041A: "K",
  \u041B: "L",
  \u041C: "M",
  \u041D: "N",
  \u041E: "O",
  \u041F: "P",
  \u0420: "R",
  \u0421: "S",
  \u0422: "T",
  \u0423: "U",
  \u0424: "F",
  \u0425: "H",
  \u0426: "C",
  \u0427: "Ch",
  \u0428: "Sh",
  \u0429: "Sh",
  \u042A: "",
  \u042B: "Y",
  \u042C: "",
  \u042D: "E",
  \u042E: "Yu",
  \u042F: "Ya"
};
var UKRAINIAN_MAP = {
  \u0404: "Ye",
  \u0406: "I",
  \u0407: "Yi",
  \u0490: "G",
  \u0454: "ye",
  \u0456: "i",
  \u0457: "yi",
  \u0491: "g"
};
var CZECH_MAP = {
  \u010D: "c",
  \u010F: "d",
  \u011B: "e",
  \u0148: "n",
  \u0159: "r",
  \u0161: "s",
  \u0165: "t",
  \u016F: "u",
  \u017E: "z",
  \u010C: "C",
  \u010E: "D",
  \u011A: "E",
  \u0147: "N",
  \u0158: "R",
  \u0160: "S",
  \u0164: "T",
  \u016E: "U",
  \u017D: "Z"
};
var SLOVAK_MAP = {
  \u00E1: "a",
  \u00E4: "a",
  \u010D: "c",
  \u010F: "d",
  \u00E9: "e",
  \u00ED: "i",
  \u013E: "l",
  \u013A: "l",
  \u0148: "n",
  \u00F3: "o",
  \u00F4: "o",
  \u0155: "r",
  \u0161: "s",
  \u0165: "t",
  \u00FA: "u",
  \u00FD: "y",
  \u017E: "z",
  \u00C1: "a",
  \u00C4: "A",
  \u010C: "C",
  \u010E: "D",
  \u00C9: "E",
  \u00CD: "I",
  \u013D: "L",
  \u0139: "L",
  \u0147: "N",
  \u00D3: "O",
  \u00D4: "O",
  \u0154: "R",
  \u0160: "S",
  \u0164: "T",
  \u00DA: "U",
  \u00DD: "Y",
  \u017D: "Z"
};
var POLISH_MAP = {
  \u0105: "a",
  \u0107: "c",
  \u0119: "e",
  \u0142: "l",
  \u0144: "n",
  \u00F3: "o",
  \u015B: "s",
  \u017A: "z",
  \u017C: "z",
  \u0104: "A",
  \u0106: "C",
  \u0118: "E",
  \u0141: "L",
  \u0143: "N",
  \u00D3: "O",
  \u015A: "S",
  \u0179: "Z",
  \u017B: "Z"
};
var LATVIAN_MAP = {
  \u0101: "a",
  \u010D: "c",
  \u0113: "e",
  \u0123: "g",
  \u012B: "i",
  \u0137: "k",
  \u013C: "l",
  \u0146: "n",
  \u0161: "s",
  \u016B: "u",
  \u017E: "z",
  \u0100: "A",
  \u010C: "C",
  \u0112: "E",
  \u0122: "G",
  \u012A: "I",
  \u0136: "K",
  \u013B: "L",
  \u0145: "N",
  \u0160: "S",
  \u016A: "U",
  \u017D: "Z"
};
var ARABIC_MAP = {
  \u0623: "a",
  \u0628: "b",
  \u062A: "t",
  \u062B: "th",
  \u062C: "g",
  \u062D: "h",
  \u062E: "kh",
  \u062F: "d",
  \u0630: "th",
  \u0631: "r",
  \u0632: "z",
  \u0633: "s",
  \u0634: "sh",
  \u0635: "s",
  \u0636: "d",
  \u0637: "t",
  \u0638: "th",
  \u0639: "aa",
  \u063A: "gh",
  \u0641: "f",
  \u0642: "k",
  \u0643: "k",
  \u0644: "l",
  \u0645: "m",
  \u0646: "n",
  \u0647: "h",
  \u0648: "o",
  \u064A: "y"
};
var LITHUANIAN_MAP = {
  \u0105: "a",
  \u010D: "c",
  \u0119: "e",
  \u0117: "e",
  \u012F: "i",
  \u0161: "s",
  \u0173: "u",
  \u016B: "u",
  \u017E: "z",
  \u0104: "A",
  \u010C: "C",
  \u0118: "E",
  \u0116: "E",
  \u012E: "I",
  \u0160: "S",
  \u0172: "U",
  \u016A: "U",
  \u017D: "Z"
};
var SERBIAN_MAP = {
  \u0452: "dj",
  \u0458: "j",
  \u0459: "lj",
  \u045A: "nj",
  \u045B: "c",
  \u045F: "dz",
  \u0111: "dj",
  \u0402: "Dj",
  \u0408: "j",
  \u0409: "Lj",
  \u040A: "Nj",
  \u040B: "C",
  \u040F: "Dz",
  \u0110: "Dj"
};
var AZERBAIJANI_MAP = {
  \u00E7: "c",
  \u0259: "e",
  \u011F: "g",
  \u0131: "i",
  \u00F6: "o",
  \u015F: "s",
  \u00FC: "u",
  \u00C7: "C",
  \u018F: "E",
  \u011E: "G",
  \u0130: "I",
  \u00D6: "O",
  \u015E: "S",
  \u00DC: "U"
};
var GEORGIAN_MAP = {
  \u10D0: "a",
  \u10D1: "b",
  \u10D2: "g",
  \u10D3: "d",
  \u10D4: "e",
  \u10D5: "v",
  \u10D6: "z",
  \u10D7: "t",
  \u10D8: "i",
  \u10D9: "k",
  \u10DA: "l",
  \u10DB: "m",
  \u10DC: "n",
  \u10DD: "o",
  \u10DE: "p",
  \u10DF: "j",
  \u10E0: "r",
  \u10E1: "s",
  \u10E2: "t",
  \u10E3: "u",
  \u10E4: "f",
  \u10E5: "q",
  \u10E6: "g",
  \u10E7: "y",
  \u10E8: "sh",
  \u10E9: "ch",
  \u10EA: "c",
  \u10EB: "dz",
  \u10EC: "w",
  \u10ED: "ch",
  \u10EE: "x",
  \u10EF: "j",
  \u10F0: "h"
};
var DECODER_MAP = {
  ...LATIN_MAP,
  ...LATIN_SYMBOLS_MAP,
  ...GREEK_MAP,
  ...TURKISH_MAP,
  ...ROMANIAN_MAP,
  ...RUSSIAN_MAP,
  ...UKRAINIAN_MAP,
  ...CZECH_MAP,
  ...SLOVAK_MAP,
  ...POLISH_MAP,
  ...LATVIAN_MAP,
  ...ARABIC_MAP,
  ...LITHUANIAN_MAP,
  ...SERBIAN_MAP,
  ...AZERBAIJANI_MAP,
  ...GEORGIAN_MAP
};
var REGEX = new RegExp(Object.keys(DECODER_MAP).join("|"), "g");
function isValidKey(x) {
  return x in DECODER_MAP;
}
function downcode(slug) {
  return slug.replace(REGEX, (m) => isValidKey(m) ? DECODER_MAP[m] : m);
}

// src/safe-keys.ts
function safeKeyToOriginal(safeKey) {
  return safeKey.replace(RE, (_match, code) => {
    return String.fromCharCode(Number.parseInt(code, 16));
  });
}
function processedSafeKey(original) {
  return original.split("").map(processedSafeChar).join("");
}
var PROCESSED_SAFE_CHARS = /[A-Za-z0-9]/;
function processedSafeChar(char) {
  if (PROCESSED_SAFE_CHARS.test(char)) {
    return char;
  }
  const code = char.charCodeAt(0);
  return `-${code.toString(16).toUpperCase().padStart(6, "0")}`;
}
var RE = /-([0-9A-F]{6})/g;

// src/cleaning.ts
import { trim } from "es-toolkit";
var EMPTY = "";
var MANY_DASHES = /[-]+/g;
var DASH = "-";
var INVALID_CHARS = /[^0-9a-z\-_]/g;
var INVALID_CHARS_CI = /[^0-9A-Za-z\-_]/g;
var INVALID_CHARS_WITH_DOTS = /[^0-9a-z\-_\.]/g;
var INVALID_CHARS_CI_WITH_DOTS = /[^0-9A-Za-z\-_\.]/g;
var INVALID_CHARS_WITH_SPECIALS = /[^0-9a-z\-_\.\/:~\|#]/g;
var INVALID_CHARS_CI_WITH_SPECIALS = /[^0-9A-Za-z\-_\.\/~:\|#]/g;
function cleanKeySimple(s) {
  return s.replace(INVALID_CHARS, EMPTY);
}
function cleanKeySimpleCI(s) {
  return s.replace(INVALID_CHARS_CI, EMPTY);
}
function cleanKeySimpleWithDots(s) {
  return s.replace(INVALID_CHARS_WITH_DOTS, EMPTY);
}
function cleanKeySimpleCIWithDots(s) {
  return s.replace(INVALID_CHARS_CI_WITH_DOTS, EMPTY);
}
function cleanKeySimpleWithSpecials(s) {
  return s.replace(INVALID_CHARS_WITH_SPECIALS, EMPTY);
}
function cleanKeySimpleCIWithSpecials(s) {
  return s.replace(INVALID_CHARS_CI_WITH_SPECIALS, EMPTY);
}
var CharAllowanceMode = /* @__PURE__ */ ((CharAllowanceMode2) => {
  CharAllowanceMode2["Strict"] = "strict";
  CharAllowanceMode2["Dots"] = "dots";
  CharAllowanceMode2["Specials"] = "specials";
  return CharAllowanceMode2;
})(CharAllowanceMode || {});
function cleanKeyCI(s, opts = {}) {
  return run(s, { ...opts, caseSensitive: false });
}
function cleanKeyWithDots(s, opts = {}) {
  return run(s, { ...opts, mode: "dots" /* Dots */ });
}
function cleanKeyCIWithDots(s, opts = {}) {
  return run(s, { ...opts, caseSensitive: false, mode: "dots" /* Dots */ });
}
function cleanKeyWithSpecials(s, opts = {}) {
  return run(s, { ...opts, mode: "specials" /* Specials */ });
}
function cleanKeyCIWithSpecials(s, opts = {}) {
  return run(s, { ...opts, caseSensitive: false, mode: "specials" /* Specials */ });
}
function cleanKey(s, opts = {}) {
  return run(s, opts);
}
var ANY_LETTERS = /[a-zA-Z]/;
function run(s, opts = {}) {
  const replaceManyDashes = opts.replaceManyDashes ?? true;
  const trimEdgeDashes = opts.trimEdgeDashes ?? false;
  const prependIfNoLetters = opts.prependIfNoLetters ?? "";
  const caseSensitive = opts.caseSensitive ?? true;
  const mode = opts.mode ?? "strict" /* Strict */;
  const cleanString = performClean(s, mode, caseSensitive);
  const value = replaceManyDashes ? cleanString.replace(MANY_DASHES, DASH) : cleanString;
  const valueTrimmed = trimEdgeDashes ? trim(value, "-") : value;
  if (prependIfNoLetters && !ANY_LETTERS.test(valueTrimmed)) {
    return run(`${prependIfNoLetters}${s}`, { ...opts, prependIfNoLetters: void 0 });
  }
  return valueTrimmed;
}
function performClean(s, mode, caseSensitive) {
  if (mode === "dots" /* Dots */) {
    return caseSensitive ? cleanKeySimpleWithDots(s) : cleanKeySimpleCIWithDots(s);
  }
  if (mode === "specials" /* Specials */) {
    return caseSensitive ? cleanKeySimpleWithSpecials(s) : cleanKeySimpleCIWithSpecials(s);
  }
  return caseSensitive ? cleanKeySimple(s) : cleanKeySimpleCI(s);
}
function parameterizeAndClean(original, opts = {}) {
  const key = parameterize(original.trim());
  return cleanKey(key, opts);
}
export {
  CharAllowanceMode,
  INVALID_CHARS,
  INVALID_CHARS_CI,
  INVALID_CHARS_CI_WITH_DOTS,
  INVALID_CHARS_CI_WITH_SPECIALS,
  INVALID_CHARS_WITH_DOTS,
  INVALID_CHARS_WITH_SPECIALS,
  cleanKey,
  cleanKeyCI,
  cleanKeyCIWithDots,
  cleanKeyCIWithSpecials,
  cleanKeySimple,
  cleanKeySimpleCI,
  cleanKeySimpleCIWithDots,
  cleanKeySimpleCIWithSpecials,
  cleanKeySimpleWithDots,
  cleanKeySimpleWithSpecials,
  cleanKeyWithDots,
  cleanKeyWithSpecials,
  parameterize,
  parameterizeAndClean,
  processedSafeKey,
  safeKeyToOriginal
};
//# sourceMappingURL=index.mjs.map