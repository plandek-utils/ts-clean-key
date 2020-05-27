import { cleanKey, cleanKeyCI, cleanKeySimple, cleanKeySimpleCI } from "..";

describe("default", () => {
  it('cleanKey("")', () => {
    expect(cleanKey("")).toEqual("");
  });

  it('cleanKey("  a - b")', () => {
    expect(cleanKey("  a - b")).toEqual("a-b");
  });

  it('cleanKey("  some Stuff 🚀 \\n ñaaa --- a")', () => {
    expect(cleanKey("  some Stuff 🚀 \n ñaaa --- a")).toEqual("sometuffaaa-a");
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

describe("case sensitiveness", () => {
  describe("cleanKey(key)", () => {
    it("removes uppercase letters", () => {
      expect(cleanKey(" Remove---Me ")).toEqual("emove-e");
    });
  });

  describe("cleanKey(key, { caseSensitive: false })", () => {
    it("allows uppercase letters", () => {
      expect(cleanKey(" Remove---Me ", { caseSensitive: false })).toEqual("Remove-Me");
    });
  });

  describe("cleanKeyCI(key)", () => {
    it("allows uppercase letters", () => {
      expect(cleanKeyCI(" Remove---Me ")).toEqual("Remove-Me");
    });
  });

  describe("cleanKeySimpleCI(key)", () => {
    it("allows uppercase letters and allows multiple dashes", () => {
      expect(cleanKeySimpleCI(" Remove---Me ")).toEqual("Remove---Me");
    });
  });
});
