import cleanKey from "..";

describe("cleanKey(s)", () => {
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
