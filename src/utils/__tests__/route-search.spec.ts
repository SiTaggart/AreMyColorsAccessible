import { parsePaletteSearch, parseSiteSearch } from "../route-search";

describe("parseSiteSearch", (): void => {
  it("keeps valid shared colour state from route search params", (): void => {
    expect(
      parseSiteSearch({
        algorithm: "apca",
        background: "#000",
        isLight: "false",
        textColor: "#fff",
      }),
    ).toStrictEqual({
      algorithm: "apca",
      background: "#000",
      isLight: false,
      textColor: "#fff",
    });
  });

  it("drops malformed boolean values instead of throwing during render", (): void => {
    expect(
      parseSiteSearch({
        background: "#000",
        isLight: "nope",
        textColor: "#fff",
      }),
    ).toStrictEqual({
      background: "#000",
      textColor: "#fff",
    });
  });

  it.each(["wcag2", "apca"] as const)(
    "keeps the %s algorithm without color params",
    (algorithm): void => {
      expect(parseSiteSearch({ algorithm })).toStrictEqual({ algorithm });
    },
  );

  it("ignores invalid and omitted algorithms", (): void => {
    expect(parseSiteSearch({ algorithm: "future" })).toStrictEqual({});
    expect(parseSiteSearch({})).toStrictEqual({});
  });
});

describe("parsePaletteSearch", (): void => {
  it("normalizes a single shared palette color to an array", (): void => {
    expect(parsePaletteSearch({ colors: "#fff" })).toStrictEqual({ colors: ["#fff"] });
  });

  it("filters repeated palette colors to strings", (): void => {
    expect(parsePaletteSearch({ colors: ["#fff", 123, "#000"] })).toStrictEqual({
      colors: ["#fff", "#000"],
    });
  });

  it.each(["wcag2", "apca"] as const)(
    "keeps the %s algorithm without colors",
    (algorithm): void => {
      expect(parsePaletteSearch({ algorithm })).toStrictEqual({ algorithm });
    },
  );

  it("keeps a valid algorithm with colors", (): void => {
    expect(parsePaletteSearch({ algorithm: "apca", colors: "#fff" })).toStrictEqual({
      algorithm: "apca",
      colors: ["#fff"],
    });
  });

  it("ignores invalid and omitted algorithms", (): void => {
    expect(parsePaletteSearch({ algorithm: "future" })).toStrictEqual({});
    expect(parsePaletteSearch({})).toStrictEqual({});
  });
});
