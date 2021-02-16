import {
  cleanKey,
  cleanKeyCI,
  cleanKeySimple,
  cleanKeySimpleCI,
  cleanKeySimpleCIWithDots,
  cleanKeySimpleWithDots,
  cleanKeyWithDots,
  cleanKeyCIWithDots,
  cleanKeySimpleCIWithSpecials,
  cleanKeySimpleWithSpecials,
  cleanKeyWithSpecials,
  cleanKeyCIWithSpecials,
  CharAllowanceMode,
} from "..";

describe("default", () => {
  it('cleanKey("")', () => {
    expect(cleanKey("")).toEqual("");
  });

  it('cleanKey("  a - b")', () => {
    expect(cleanKey("  a - b")).toEqual("a-b");
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
      expect(cleanKey(" Re.move---Me ")).toEqual("emove-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false })", () => {
    it("allows uppercase letters", () => {
      expect(cleanKey(" Re.move---Me ", { caseSensitive: false })).toEqual("Remove-Me");
    });
  });

  describe("cleanKeyCI(key)", () => {
    it("allows uppercase letters", () => {
      expect(cleanKeyCI(" Re.move---Me ")).toEqual("Remove-Me");
    });
  });

  describe("cleanKeySimpleCI(key)", () => {
    it("allows uppercase letters and allows multiple dashes", () => {
      expect(cleanKeySimpleCI(" Re.move---Me ")).toEqual("Remove---Me");
    });
  });
});

describe("dots", () => {
  describe("cleanKey(key)", () => {
    it("removes uppercase letters, dots and multiple dashes", () => {
      expect(cleanKey(" Re.move---Me ")).toEqual("emove-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false })", () => {
    it("allows uppercase letters, removes dots and multiple", () => {
      expect(cleanKey(" Re.move---Me ", { caseSensitive: false })).toEqual("Remove-Me");
    });
  });

  describe("cleanKey(key, { mode: CharAllowanceMode.Dots })", () => {
    it("allows dots, removes uppercase letters, and multiple dashes", () => {
      expect(cleanKey(" Re.move---Me ", { mode: CharAllowanceMode.Dots })).toEqual("e.move-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false, mode: CharAllowanceMode.Dots })", () => {
    it("allows uppercase letters and dots, and multiple", () => {
      expect(cleanKey(" Re.move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots })).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeyCI(key)", () => {
    it("allows uppercase letters, removes dots and removes multiple dashes", () => {
      expect(cleanKeyCI(" Re.move---Me ")).toEqual("Remove-Me");
    });
  });

  describe("cleanKeyCI(key, { mode: CharAllowanceMode.Dots })", () => {
    it("allows uppercase letters and dots, removes multiple dashes", () => {
      expect(cleanKeyCI(" Re.move---Me ", { mode: CharAllowanceMode.Dots })).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeyWithDots(key)", () => {
    it("allows dots, removes uppercase letters and dots, and multiple dashes", () => {
      expect(cleanKeyWithDots(" Re.move---Me ")).toEqual("e.move-e");
    });
  });

  describe("cleanKeyWithDots(key, { caseSensitive: false })", () => {
    it("allows dots, removes uppercase letters and dots, and multiple dashes", () => {
      expect(cleanKeyWithDots(" Re.move---Me ", { caseSensitive: false })).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeyWithDots(key, { replaceManyDashes: false })", () => {
    it("allows uppercase letters and dots, allows multiple dashes", () => {
      expect(cleanKeyWithDots(" Re.move---Me ", { replaceManyDashes: false })).toEqual("e.move---e");
    });
  });

  describe("cleanKeyCIWithDots(key)", () => {
    it("allows uppercase letters and dots, removes multiple dashes", () => {
      expect(cleanKeyCIWithDots(" Re.move---Me ")).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeySimple(key)", () => {
    it("allows multiple dashes, removes dots and uppercase letters", () => {
      expect(cleanKeySimple(" Re.move---Me ")).toEqual("emove---e");
    });
  });

  describe("cleanKeySimpleCI(key)", () => {
    it("allows uppercase letters and allows multiple dashes, removes dots", () => {
      expect(cleanKeySimpleCI(" Re.move---Me ")).toEqual("Remove---Me");
    });
  });

  describe("cleanKeySimpleWithDots(key)", () => {
    it("removes uppercase letters, allows multiple dashes and dots", () => {
      expect(cleanKeySimpleWithDots(" Re.move---Me ")).toEqual("e.move---e");
    });
  });
  describe("cleanKeySimpleCIWithDots(key)", () => {
    it("allows uppercase letters and allows multiple dashes and dots", () => {
      expect(cleanKeySimpleCIWithDots(" Re.move---Me ")).toEqual("Re.move---Me");
    });
  });
});

describe("specials", () => {
  describe("cleanKey(key)", () => {
    it("removes uppercase letters, specials and multiple dashes", () => {
      expect(cleanKey(" Re.move---Me ")).toEqual("emove-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false })", () => {
    it("allows uppercase letters, removes specials and multiple", () => {
      expect(cleanKey(" Re.move---Me ", { caseSensitive: false })).toEqual("Remove-Me");
    });
  });

  describe("cleanKey(key, { mode: CharAllowanceMode.Specials })", () => {
    it("allows specials, removes uppercase letters, and multiple dashes", () => {
      expect(cleanKey(" Re.move---Me ", { mode: CharAllowanceMode.Specials })).toEqual("e.move-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false, mode: CharAllowanceMode.Specials })", () => {
    it("allows uppercase letters and specials, and multiple", () => {
      expect(cleanKey(" Re.move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Specials })).toEqual(
        "Re.move-Me"
      );
    });
  });

  describe("cleanKeyCI(key)", () => {
    it("allows uppercase letters, removes specials and removes multiple dashes", () => {
      expect(cleanKeyCI(" Re.move---Me ")).toEqual("Remove-Me");
    });
  });

  describe("cleanKeyCI(key, { mode: CharAllowanceMode.Specials })", () => {
    it("allows uppercase letters and specials, removes multiple dashes", () => {
      expect(cleanKeyCI(" Re.move---Me ", { mode: CharAllowanceMode.Specials })).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeyWithSpecials(key)", () => {
    it("allows specials, removes uppercase letters and specials, and multiple dashes", () => {
      expect(cleanKeyWithSpecials(" Re.move---Me ")).toEqual("e.move-e");
    });
  });

  describe("cleanKeyWithSpecials(key, { caseSensitive: false })", () => {
    it("allows specials, removes uppercase letters and specials, and multiple dashes", () => {
      expect(cleanKeyWithSpecials(" Re.move---Me ", { caseSensitive: false })).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeyWithSpecials(key, { replaceManyDashes: false })", () => {
    it("allows uppercase letters and specials, allows multiple dashes", () => {
      expect(cleanKeyWithSpecials(" Re.move---Me ", { replaceManyDashes: false })).toEqual("e.move---e");
    });
  });

  describe("cleanKeyCIWithSpecials(key)", () => {
    it("allows uppercase letters and specials, removes multiple dashes", () => {
      expect(cleanKeyCIWithSpecials(" Re.move---Me ")).toEqual("Re.move-Me");
    });
  });

  describe("cleanKeySimple(key)", () => {
    it("allows multiple dashes, removes specials and uppercase letters", () => {
      expect(cleanKeySimple(" Re.move---Me ")).toEqual("emove---e");
    });
  });

  describe("cleanKeySimpleCI(key)", () => {
    it("allows uppercase letters and allows multiple dashes, removes specials", () => {
      expect(cleanKeySimpleCI(" Re.move---Me ")).toEqual("Remove---Me");
    });
  });

  describe("cleanKeySimpleWithSpecials(key)", () => {
    it("removes uppercase letters, allows multiple dashes and specials", () => {
      expect(cleanKeySimpleWithSpecials(" Re.move---Me ")).toEqual("e.move---e");
    });
  });
  describe("cleanKeySimpleCIWithSpecials(key)", () => {
    it("allows uppercase letters and allows multiple dashes and specials", () => {
      expect(cleanKeySimpleCIWithSpecials(" Re.move---Me ")).toEqual("Re.move---Me");
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

  it("dots and special chars", () => {
    expect(cleanKey(" Re.|/~:move---Me ")).toEqual("emove-e");

    expect(cleanKey(" Re.|/~:move---Me ", { mode: CharAllowanceMode.Dots })).toEqual("e.move-e");
    expect(cleanKeyWithDots(" Re.|/~:move---Me ")).toEqual("e.move-e");

    expect(cleanKey(" Re.|/~:move---Me ", { mode: CharAllowanceMode.Specials })).toEqual("e.|/~:move-e");
    expect(cleanKeyWithSpecials(" Re.|/~:move---Me ")).toEqual("e.|/~:move-e");

    expect(cleanKey(" Re.|/~:move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots })).toEqual(
      "Re.move-Me"
    );
    expect(cleanKeyWithDots(" Re.|/~:move---Me ", { caseSensitive: false })).toEqual("Re.move-Me");
    expect(cleanKeyCI(" Re.|/~:move---Me ", { mode: CharAllowanceMode.Dots })).toEqual("Re.move-Me");

    expect(cleanKey(" Re.|/~:move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Specials })).toEqual(
      "Re.|/~:move-Me"
    );
    expect(cleanKeyWithSpecials(" Re.|/~:move---Me ", { caseSensitive: false })).toEqual("Re.|/~:move-Me");
    expect(cleanKeyCI(" Re.|/~:move---Me ", { mode: CharAllowanceMode.Specials })).toEqual("Re.|/~:move-Me");

    expect(cleanKey(" Re.|/~:move---Me ", { replaceManyDashes: false, mode: CharAllowanceMode.Dots })).toEqual(
      "e.move---e"
    );
    expect(cleanKeyWithDots(" Re.|/~:move---Me ", { replaceManyDashes: false })).toEqual("e.move---e");
    expect(cleanKeySimpleWithDots(" Re.|/~:move---Me ")).toEqual("e.move---e");

    expect(cleanKey(" Re.|/~:move---Me ", { replaceManyDashes: false, mode: CharAllowanceMode.Specials })).toEqual(
      "e.|/~:move---e"
    );
    expect(cleanKeyWithSpecials(" Re.|/~:move---Me ", { replaceManyDashes: false })).toEqual("e.|/~:move---e");
    expect(cleanKeySimpleWithSpecials(" Re.|/~:move---Me ")).toEqual("e.|/~:move---e");

    expect(
      cleanKey(" Re.|/~:move---Me ", { caseSensitive: false, mode: CharAllowanceMode.Dots, replaceManyDashes: false })
    ).toEqual("Re.move---Me");
    expect(cleanKeyWithDots(" Re.|/~:move---Me ", { caseSensitive: false, replaceManyDashes: false })).toEqual(
      "Re.move---Me"
    );
    expect(cleanKeyCI(" Re.|/~:move---Me ", { mode: CharAllowanceMode.Dots, replaceManyDashes: false })).toEqual(
      "Re.move---Me"
    );
    expect(cleanKeySimpleCIWithDots(" Re.|/~:move---Me ")).toEqual("Re.move---Me");

    expect(
      cleanKey(" Re.|/~:move---Me ", {
        caseSensitive: false,
        mode: CharAllowanceMode.Specials,
        replaceManyDashes: false,
      })
    ).toEqual("Re.|/~:move---Me");
    expect(cleanKeyWithSpecials(" Re.|/~:move---Me ", { caseSensitive: false, replaceManyDashes: false })).toEqual(
      "Re.|/~:move---Me"
    );
    expect(cleanKeyCI(" Re.|/~:move---Me ", { mode: CharAllowanceMode.Specials, replaceManyDashes: false })).toEqual(
      "Re.|/~:move---Me"
    );
    expect(cleanKeySimpleCIWithSpecials(" Re.|/~:move---Me ")).toEqual("Re.|/~:move---Me");
  });
});
