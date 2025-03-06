import { describe, expect, it } from "vitest";

import {
  CharAllowanceMode,
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
  escapeTemplateString,
  parameterizeAndClean,
  processedSafeKey,
  safeKeyToOriginal,
} from "..";

describe("parameterizeAndClean", () => {
  it('parameterizeAndClean("")', () => {
    expect(parameterizeAndClean("")).toEqual("");
  });

  it('parameterizeAndClean("  a - b  ")', () => {
    expect(parameterizeAndClean("  a - b  ")).toEqual("a-b");
  });

  it('parameterizeAndClean("  parameterized url with special characters, öçıŞÇ  ")', () => {
    expect(parameterizeAndClean("  parameterized url with special characters, öçıŞÇ  ")).toEqual(
      "parameterized-url-with-special-characters-ocisc",
    );
  });

  it('parameterizeAndClean("  |/~  ")', () => {
    expect(parameterizeAndClean("  |/~  ", { prependIfNoLetters: "S.tu" })).toEqual("tu");
  });

  it('parameterizeAndClean(" - |/~ - ")', () => {
    expect(parameterizeAndClean(" -  |/~ -  ", { prependIfNoLetters: "-S.t-u" })).toEqual("-t-u-");
  });

  it('parameterizeAndClean("  - |/~ - ", { trimEdgeDashes: true })', () => {
    expect(parameterizeAndClean("  - |/~ -  ", { prependIfNoLetters: "-S.t-u", trimEdgeDashes: true })).toEqual("t-u");
  });
  it('parameterizeAndClean("  - |/~ - ", { trimEdgeDashes: true })', () => {
    expect(parameterizeAndClean("  -__|/~ -  ", { prependIfNoLetters: "-S.t_-_u", trimEdgeDashes: true })).toEqual(
      "t_-_u-__",
    );
  });
});

describe("default", () => {
  it('cleanKey("")', () => {
    expect(cleanKey("")).toEqual("");
  });

  it('cleanKey("  a - b  ")', () => {
    expect(cleanKey("  a - b  ")).toEqual("a-b");
  });

  it('cleanKey("  s|/~:ome S.tuff 🚀 \\n ñaaa --- a")', () => {
    expect(cleanKey("  s|/~:ome S.tuff 🚀 \n ñaaa --- a")).toEqual("sometuffaaa-a");
  });
});

describe("with no letters", () => {
  it('cleanKey("", { prependIfNoLetters: "S.tu" })', () => {
    expect(cleanKey("", { prependIfNoLetters: "S.tu" })).toEqual("tu");
  });

  it('cleanKey("  a - b")', () => {
    expect(cleanKey("  a - b")).toEqual("a-b");
  });

  it('cleanKey("  1 - 2", { prependIfNoLetters: "S.tu  " })', () => {
    expect(cleanKey("  1 - 2", { prependIfNoLetters: "S.tu  " })).toEqual("tu1-2");
  });

  it('cleanKey("  a - 2", { prependIfNoLetters: "S.tu  " })', () => {
    expect(cleanKey("  a - 2", { prependIfNoLetters: "S.tu  " })).toEqual("a-2");
  });

  it('cleanKey("  1 - 2", )', () => {
    expect(cleanKey("  1 - 2")).toEqual("1-2");
  });

  it('cleanKey("  s|/~:ome S.tuff 🚀 \\n ñaaa --- a")', () => {
    expect(cleanKey("  s|/~:ome S.tuff 🚀 \n ñaaa --- a")).toEqual("sometuffaaa-a");
  });
});

describe("replacing multiple dashes", () => {
  it("without options => replaces multiple dashes with single dash", () => {
    expect(cleanKey("  some---a ")).toEqual("some-a");
  });

  it("with options `{ replaceManyDashes: true }` => replaces multiple dashes with single dash", () => {
    expect(cleanKey("  some---a ", { replaceManyDashes: true })).toEqual("some-a");
  });

  it("with options `{ replaceManyDashes: false }` => keeps multiple dashes untouched", () => {
    expect(cleanKey("  some---a ", { replaceManyDashes: false })).toEqual("some---a");
  });

  it("testing it for a composed key", () => {
    const a = cleanKey(" something-is-here "); // => "something-is-here"
    const b = cleanKey(" and-there   "); // => "and-there"
    const key = `${a}--${b}`; // => "something-is-here--and-there"

    expect(a).toEqual("something-is-here");
    expect(b).toEqual("and-there");
    expect(key).toEqual("something-is-here--and-there");

    expect(cleanKey(key)).not.toEqual(key); // it will change the `here--and` for a `here-and`
    expect(cleanKey(key, { replaceManyDashes: false })).toEqual(key); // => true
  });
});

describe("case sensitiveness", () => {
  describe("cleanKey(key)", () => {
    it("removes uppercase letters", () => {
      expect(cleanKey(" Re.m#ove---Me ")).toEqual("emove-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false })", () => {
    it("allows uppercase letters", () => {
      expect(cleanKey(" Re.m#ove---Me ", { caseSensitive: false })).toEqual("Remove-Me");
    });
  });

  describe("cleanKeyCI(key)", () => {
    it("allows uppercase letters", () => {
      expect(cleanKeyCI(" Re.m#ove---Me ")).toEqual("Remove-Me");
    });
  });

  describe("cleanKeySimpleCI(key)", () => {
    it("allows uppercase letters and allows multiple dashes", () => {
      expect(cleanKeySimpleCI(" Re.m#ove---Me ")).toEqual("Remove---Me");
    });
  });
});

describe("dots", () => {
  describe("cleanKey(key)", () => {
    it("removes uppercase letters, dots and multiple dashes", () => {
      expect(cleanKey(" Re.m#ove---Me ")).toEqual("emove-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false })", () => {
    it("allows uppercase letters, removes dots and multiple", () => {
      expect(cleanKey(" Re.m#ove---Me ", { caseSensitive: false })).toEqual("Remove-Me");
    });
  });

  describe("cleanKey(key, { mode: CharAllowanceMode.Dots })", () => {
    it("allows dots, removes uppercase letters, and multiple dashes", () => {
      expect(cleanKey(" Re.m#ove---Me ", { mode: CharAllowanceMode.Dots })).toEqual("e.move-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false, mode: CharAllowanceMode.Dots })", () => {
    it("allows uppercase letters and dots, and multiple", () => {
      expect(cleanKey(" Re.m#ove---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots })).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeyCI(key)", () => {
    it("allows uppercase letters, removes dots and removes multiple dashes", () => {
      expect(cleanKeyCI(" Re.m#ove---Me ")).toEqual("Remove-Me");
    });
  });

  describe("cleanKeyCI(key, { mode: CharAllowanceMode.Dots })", () => {
    it("allows uppercase letters and dots, removes multiple dashes", () => {
      expect(cleanKeyCI(" Re.m#ove---Me ", { mode: CharAllowanceMode.Dots })).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeyWithDots(key)", () => {
    it("allows dots, removes uppercase letters and dots, and multiple dashes", () => {
      expect(cleanKeyWithDots(" Re.m#ove---Me ")).toEqual("e.move-e");
    });
  });

  describe("cleanKeyWithDots(key, { caseSensitive: false })", () => {
    it("allows dots, removes uppercase letters and dots, and multiple dashes", () => {
      expect(cleanKeyWithDots(" Re.m#ove---Me ", { caseSensitive: false })).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeyWithDots(key, { replaceManyDashes: false })", () => {
    it("allows uppercase letters and dots, allows multiple dashes", () => {
      expect(cleanKeyWithDots(" Re.m#ove---Me ", { replaceManyDashes: false })).toEqual("e.move---e");
    });
  });

  describe("cleanKeyCIWithDots(key)", () => {
    it("allows uppercase letters and dots, removes multiple dashes", () => {
      expect(cleanKeyCIWithDots(" Re.m#ove---Me ")).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeySimple(key)", () => {
    it("allows multiple dashes, removes dots and uppercase letters", () => {
      expect(cleanKeySimple(" Re.m#ove---Me ")).toEqual("emove---e");
    });
  });

  describe("cleanKeySimpleCI(key)", () => {
    it("allows uppercase letters and allows multiple dashes, removes dots", () => {
      expect(cleanKeySimpleCI(" Re.m#ove---Me ")).toEqual("Remove---Me");
    });
  });

  describe("cleanKeySimpleWithDots(key)", () => {
    it("removes uppercase letters, allows multiple dashes and dots", () => {
      expect(cleanKeySimpleWithDots(" Re.m#ove---Me ")).toEqual("e.move---e");
    });
  });
  describe("cleanKeySimpleCIWithDots(key)", () => {
    it("allows uppercase letters and allows multiple dashes and dots", () => {
      expect(cleanKeySimpleCIWithDots(" Re.m#ove---Me ")).toEqual("Re.move---Me");
    });
  });
});

describe("specials", () => {
  describe("cleanKey(key)", () => {
    it("removes uppercase letters, specials and multiple dashes", () => {
      expect(cleanKey(" Re.m#ove---Me ")).toEqual("emove-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false })", () => {
    it("allows uppercase letters, removes specials and multiple", () => {
      expect(cleanKey(" Re.m#ove---Me ", { caseSensitive: false })).toEqual("Remove-Me");
    });
  });

  describe("cleanKey(key, { mode: CharAllowanceMode.Specials })", () => {
    it("allows specials, removes uppercase letters, and multiple dashes", () => {
      expect(cleanKey(" Re.m#ove---Me ", { mode: CharAllowanceMode.Specials })).toEqual("e.m#ove-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false, mode: CharAllowanceMode.Specials })", () => {
    it("allows uppercase letters and specials, and multiple", () => {
      expect(cleanKey(" Re.m#ove---Me ", { caseSensitive: false, mode: CharAllowanceMode.Specials })).toEqual(
        "Re.m#ove-Me",
      );
    });
  });

  describe("cleanKeyCI(key)", () => {
    it("allows uppercase letters, removes specials and removes multiple dashes", () => {
      expect(cleanKeyCI(" Re.m#ove---Me ")).toEqual("Remove-Me");
    });
  });

  describe("cleanKeyCI(key, { mode: CharAllowanceMode.Specials })", () => {
    it("allows uppercase letters and specials, removes multiple dashes", () => {
      expect(cleanKeyCI(" Re.m#ove---Me ", { mode: CharAllowanceMode.Specials })).toEqual("Re.m#ove-Me");
    });
  });

  describe("cleanKeyWithSpecials(key)", () => {
    it("allows specials, removes uppercase letters and specials, and multiple dashes", () => {
      expect(cleanKeyWithSpecials(" Re.m#ove---Me ")).toEqual("e.m#ove-e");
    });
  });

  describe("cleanKeyWithSpecials(key, { caseSensitive: false })", () => {
    it("allows specials, removes uppercase letters and specials, and multiple dashes", () => {
      expect(cleanKeyWithSpecials(" Re.m#ove---Me ", { caseSensitive: false })).toEqual("Re.m#ove-Me");
    });
  });

  describe("cleanKeyWithSpecials(key, { replaceManyDashes: false })", () => {
    it("allows uppercase letters and specials, allows multiple dashes", () => {
      expect(cleanKeyWithSpecials(" Re.m#ove---Me ", { replaceManyDashes: false })).toEqual("e.m#ove---e");
    });
  });

  describe("cleanKeyCIWithSpecials(key)", () => {
    it("allows uppercase letters and specials, removes multiple dashes", () => {
      expect(cleanKeyCIWithSpecials(" Re.m#ove---Me ")).toEqual("Re.m#ove-Me");
    });
  });

  describe("cleanKeySimple(key)", () => {
    it("allows multiple dashes, removes specials and uppercase letters", () => {
      expect(cleanKeySimple(" Re.m#ove---Me ")).toEqual("emove---e");
    });
  });

  describe("cleanKeySimpleCI(key)", () => {
    it("allows uppercase letters and allows multiple dashes, removes specials", () => {
      expect(cleanKeySimpleCI(" Re.m#ove---Me ")).toEqual("Remove---Me");
    });
  });

  describe("cleanKeySimpleWithSpecials(key)", () => {
    it("removes uppercase letters, allows multiple dashes and specials", () => {
      expect(cleanKeySimpleWithSpecials(" Re.m#ove---Me ")).toEqual("e.m#ove---e");
    });
  });
  describe("cleanKeySimpleCIWithSpecials(key)", () => {
    it("allows uppercase letters and allows multiple dashes and specials", () => {
      expect(cleanKeySimpleCIWithSpecials(" Re.m#ove---Me ")).toEqual("Re.m#ove---Me");
    });
  });
});

describe("cleanKeySimple(s)", () => {
  it('cleanKeySimple("")', () => {
    expect(cleanKeySimple("")).toEqual("");
  });

  it('cleanKeySimple("  a - b")', () => {
    expect(cleanKeySimple("  a - b")).toEqual("a-b");
  });

  it('cleanKeySimple("  some Stuff 🚀 \\n ñaaa --- a")', () => {
    expect(cleanKeySimple("  some Stuff 🚀 \n ñaaa --- a")).toEqual("sometuffaaa---a");
  });

  it("testing it for a composed key", () => {
    const a = cleanKeySimple(" something-is-here "); // => "something-is-here"
    const b = cleanKeySimple(" and-there   "); // => "and-there"
    const key = `${a}--${b}`; // => "something-is-here--and-there"

    expect(a).toEqual("something-is-here");
    expect(b).toEqual("and-there");
    expect(key).toEqual("something-is-here--and-there");

    expect(cleanKeySimple(key)).toEqual(key);
  });
});

describe("cleanKeySimpleCI(s)", () => {
  it('cleanKeySimpleCI("")', () => {
    expect(cleanKeySimpleCI("")).toEqual("");
  });

  it('cleanKeySimpleCI("  a - b")', () => {
    expect(cleanKeySimpleCI("  a - b")).toEqual("a-b");
  });

  it('cleanKeySimpleCI("  some Stuff 🚀 \\n ñaaa --- a")', () => {
    expect(cleanKeySimpleCI("  some Stuff 🚀 \n ñaaa --- a")).toEqual("someStuffaaa---a");
  });

  it("testing it for a composed key", () => {
    const a = cleanKeySimpleCI(" something-is-here "); // => "something-is-here"
    const b = cleanKeySimpleCI(" And-there   "); // => "And-there"
    const key = `${a}--${b}`; // => "something-is-here--And-there"

    expect(a).toEqual("something-is-here");
    expect(b).toEqual("And-there");
    expect(key).toEqual("something-is-here--And-there");

    expect(cleanKeySimpleCI(key)).toEqual(key);
  });
});

describe("test examples in README", () => {
  it("main", () => {
    expect(cleanKey("")).toEqual("");
    expect(cleanKey("  a - b")).toEqual("a-b");
    expect(cleanKey("  some Stuff 🚀 \n ñaaa --- a")).toEqual("sometuffaaa-a");
  });

  it("replaceManyDashes", () => {
    expect(cleanKey(" something-is---here ")).toEqual("something-is-here");
    expect(cleanKey(" something-is---here ", { replaceManyDashes: false })).toEqual("something-is---here");
    expect(cleanKeySimple(" something-is---here ")).toEqual("something-is---here");
  });

  it("caseSensitive", () => {
    expect(cleanKey(" Remove---Me ")).toEqual("emove-e");
    expect(cleanKey(" Remove---Me ", { caseSensitive: false })).toEqual("Remove-Me");
    expect(cleanKeyCI(" Remove---Me ")).toEqual("Remove-Me");

    expect(cleanKey(" Remove---Me ", { replaceManyDashes: false })).toEqual("emove---e");
    expect(cleanKey(" Remove---Me ", { replaceManyDashes: false, caseSensitive: false })).toEqual("Remove---Me");
    expect(cleanKeySimpleCI(" Remove---Me ")).toEqual("Remove---Me");
  });

  // it("dots and special chars", () => {
  //   expect(cleanKey(" Re.|/~:m#ove---Me ")).toEqual("emove-e");
  //
  //   expect(cleanKey(" Re.|/~:m#ove---Me ", { mode: CharAllowanceMode.Dots })).toEqual("e.move-e");
  //   expect(cleanKeyWithDots(" Re.|/~:m#ove---Me ")).toEqual("e.move-e");
  //
  //   expect(cleanKey(" Re.|/~:m#ove---Me ", { mode: CharAllowanceMode.Specials })).toEqual("e.|/~:m#ove-e");
  //   expect(cleanKeyWithSpecials(" Re.|/~:m#ove---Me ")).toEqual("e.|/~:m#ove-e");
  //
  //   expect(cleanKey(" Re.|/~:m#ove---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots })).toEqual(
  //     "Re.move-Me"
  //   );
  //   expect(cleanKeyWithDots(" Re.|/~:m#ove---Me ", { caseSensitive: false })).toEqual("Re.move-Me");
  //   expect(cleanKeyCI(" Re.|/~:m#ove---Me ", { mode: CharAllowanceMode.Dots })).toEqual("Re.move-Me");
  //
  //   expect(cleanKey(" Re.|/~:m#ove---Me ", { caseSensitive: false, mode: CharAllowanceMode.Specials })).toEqual(
  //     "Re.|/~:move-Me"
  //   );
  //   expect(cleanKeyWithSpecials(" Re.|/~:m#ove---Me ", { caseSensitive: false })).toEqual("Re.|/~:move-Me");
  //   expect(cleanKeyCI(" Re.|/~:m#ove---Me ", { mode: CharAllowanceMode.Specials })).toEqual("Re.|/~:move-Me");
  //
  //   expect(cleanKey(" Re.|/~:m#ove---Me ", { replaceManyDashes: false, mode: CharAllowanceMode.Dots })).toEqual(
  //     "e.move---e"
  //   );
  //   expect(cleanKeyWithDots(" Re.|/~:m#ove---Me ", { replaceManyDashes: false })).toEqual("e.move---e");
  //   expect(cleanKeySimpleWithDots(" Re.|/~:m#ove---Me ")).toEqual("e.move---e");
  //
  //   expect(cleanKey(" Re.|/~:m#ove---Me ", { replaceManyDashes: false, mode: CharAllowanceMode.Specials })).toEqual(
  //     "e.|/~:move---e"
  //   );
  //   expect(cleanKeyWithSpecials(" Re.|/~:m#ove---Me ", { replaceManyDashes: false })).toEqual("e.|/~:move---e");
  //   expect(cleanKeySimpleWithSpecials(" Re.|/~:m#ove---Me ")).toEqual("e.|/~:move---e");
  //
  //   expect(
  //     cleanKey(" Re.|/~:m#ove---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots, replaceManyDashes: false })
  //   ).toEqual("Re.m#ove---Me");
  //   expect(cleanKeyWithDots(" Re.|/~:m#ove---Me ", { caseSensitive: false, replaceManyDashes: false })).toEqual(
  //     "Re.m#ove---Me"
  //   );
  //   expect(cleanKeyCI(" Re.|/~:m#ove---Me ", { mode: CharAllowanceMode.Dots, replaceManyDashes: false })).toEqual(
  //     "Re.m#ove---Me"
  //   );
  //   expect(cleanKeySimpleCIWithDots(" Re.|/~:m#ove---Me ")).toEqual("Re.m#ove---Me");
  //
  //   expect(
  //     cleanKey(" Re.|/~:m#ove---Me ", {
  //       caseSensitive: false,
  //       mode: CharAllowanceMode.Specials,
  //       replaceManyDashes: false,
  //     })
  //   ).toEqual("Re.|/~:m#ove---Me");
  //   expect(cleanKeyWithSpecials(" Re.|/~:m#ove---Me ", { caseSensitive: false, replaceManyDashes: false })).toEqual(
  //     "Re.|/~:m#ove---Me"
  //   );
  //   expect(cleanKeyCI(" Re.|/~:m#ove---Me ", { mode: CharAllowanceMode.Specials, replaceManyDashes: false })).toEqual(
  //     "Re.|/~:m#ove---Me"
  //   );
  //   expect(cleanKeySimpleCIWithSpecials(" Re.|/~:m#ove---Me ")).toEqual("Re.|/~:m#ove---Me");
  // });

  it("mode: dots", () => {
    expect(cleanKey(" Re.|~:/m#ove---Me ")).toEqual("emove-e");

    expect(cleanKey(" Re.|~:/m#ove---Me ", { mode: CharAllowanceMode.Dots })).toEqual("e.move-e");
    expect(cleanKeyWithDots(" Re.|~:/m#ove---Me ")).toEqual("e.move-e");

    expect(cleanKey(" Re.|~:/m#ove---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots })).toEqual(
      "Re.move-Me",
    );
    expect(cleanKeyWithDots(" Re.|~:/m#ove---Me ", { caseSensitive: false })).toEqual("Re.move-Me");
    expect(cleanKeyCI(" Re.|~:/m#ove---Me ", { mode: CharAllowanceMode.Dots })).toEqual("Re.move-Me");

    expect(cleanKey(" Re.|~:/m#ove---Me ", { replaceManyDashes: false, mode: CharAllowanceMode.Dots })).toEqual(
      "e.move---e",
    );
    expect(cleanKeyWithDots(" Re.|~:/m#ove---Me ", { replaceManyDashes: false })).toEqual("e.move---e");
    expect(cleanKeySimpleWithDots(" Re.|~:/m#ove---Me ")).toEqual("e.move---e");

    expect(
      cleanKey(" Re.|~:/m#ove---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots, replaceManyDashes: false }),
    ).toEqual("Re.move---Me");
    expect(cleanKeyWithDots(" Re.|~:/m#ove---Me ", { caseSensitive: false, replaceManyDashes: false })).toEqual(
      "Re.move---Me",
    );
    expect(cleanKeyCI(" Re.|~:/m#ove---Me ", { mode: CharAllowanceMode.Dots, replaceManyDashes: false })).toEqual(
      "Re.move---Me",
    );
    expect(cleanKeySimpleCIWithDots(" Re.|~:/m#ove---Me ")).toEqual("Re.move---Me");
  });

  it("mode: specials", () => {
    expect(cleanKey(" Re.|~:/m#ove---Me ")).toEqual("emove-e");

    expect(cleanKey(" Re.|~:/m#ove---Me ", { mode: CharAllowanceMode.Specials })).toEqual("e.|~:/m#ove-e");
    expect(cleanKeyWithSpecials(" Re.|~:/m#ove---Me ")).toEqual("e.|~:/m#ove-e");

    expect(cleanKey(" Re.|~:/m#ove---Me ", { caseSensitive: false, mode: CharAllowanceMode.Specials })).toEqual(
      "Re.|~:/m#ove-Me",
    );
    expect(cleanKeyWithSpecials(" Re.|~:/m#ove---Me ", { caseSensitive: false })).toEqual("Re.|~:/m#ove-Me");
    expect(cleanKeyCI(" Re.|~:/m#ove---Me ", { mode: CharAllowanceMode.Specials })).toEqual("Re.|~:/m#ove-Me");

    expect(cleanKey(" Re.|~:/m#ove---Me ", { replaceManyDashes: false, mode: CharAllowanceMode.Specials })).toEqual(
      "e.|~:/m#ove---e",
    );
    expect(cleanKeyWithSpecials(" Re.|~:/m#ove---Me ", { replaceManyDashes: false })).toEqual("e.|~:/m#ove---e");
    expect(cleanKeySimpleWithSpecials(" Re.|~:/m#ove---Me ")).toEqual("e.|~:/m#ove---e");

    expect(
      cleanKey(" Re.|~:/m#ove---Me ", {
        caseSensitive: false,
        mode: CharAllowanceMode.Specials,
        replaceManyDashes: false,
      }),
    ).toEqual("Re.|~:/m#ove---Me");
    expect(cleanKeyWithSpecials(" Re.|~:/m#ove---Me ", { caseSensitive: false, replaceManyDashes: false })).toEqual(
      "Re.|~:/m#ove---Me",
    );
    expect(cleanKeyCI(" Re.|~:/m#ove---Me ", { mode: CharAllowanceMode.Specials, replaceManyDashes: false })).toEqual(
      "Re.|~:/m#ove---Me",
    );
    expect(cleanKeySimpleCIWithSpecials(" Re.|~:/m#ove---Me ")).toEqual("Re.|~:/m#ove---Me");
  });
});

describe("processedSafeKey", () => {
  it("works fine with safe chars", () => {
    expect(processedSafeKey("casa")).toEqual("casa");
  });

  it("replaces space with -000020", () => {
    expect(processedSafeKey("casa de paco")).toEqual("casa-000020de-000020paco");
  });

  it("replaces space with -000020", () => {
    expect(processedSafeKey("casa de/paco")).toEqual("casa-000020de-00002Fpaco");
  });
});

describe("safeKeyToOriginal", () => {
  it("works fine with safe chars", () => {
    expect(safeKeyToOriginal("casa")).toEqual("casa");
  });

  it("replaces space with -000020", () => {
    expect(safeKeyToOriginal("casa-000020-000020de-000020paco")).toEqual("casa  de paco");
  });

  it("replaces / with -00002F", () => {
    expect(safeKeyToOriginal("casa-000020de-00002Fpaco")).toEqual("casa de/paco");
  });

  for (const testCase of ["Turiño", "Turiño de Abajo", "square brackets [ ] -0 -0", "😁 la caña!"]) {
    const safe = processedSafeKey(testCase);
    it(`works with ${safe} => ${testCase}`, () => {
      expect(safeKeyToOriginal(safe)).toEqual(testCase);
    });
  }
});

describe("escapeTemplateString", () => {
  it("should escape curly braces", () => {
    expect(escapeTemplateString("{hello}")).toEqual("{{hello}}");
  });

  it("should escape square brackets", () => {
    expect(escapeTemplateString("[world]")).toEqual("[[world]]");
  });

  it("should escape both curly braces and square brackets", () => {
    expect(escapeTemplateString("{hello [world]}")).toEqual("{{hello [[world]]}}");
  });

  it("should handle empty string", () => {
    expect(escapeTemplateString("")).toEqual("");
  });

  it("should handle string without special characters", () => {
    expect(escapeTemplateString("hello world")).toEqual("hello world");
  });

  it("should handle multiple occurrences of special characters", () => {
    expect(escapeTemplateString("{a} {b} [c] [d]")).toEqual("{{a}} {{b}} [[c]] [[d]]");
  });

  it("should handle already escaped characters (not repeatable)", () => {
    // As mentioned in the function documentation, the function is not repeatable
    const once = escapeTemplateString("{hello}");
    const twice = escapeTemplateString(once);
    expect(once).toEqual("{{hello}}");
    expect(twice).toEqual("{{{{hello}}}}");
  });
});
