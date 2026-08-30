/* eslint-disable react/display-name */
import * as React from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { createMemoryHistory, RouterContextProvider } from "@tanstack/react-router";
import type { PalettePageQueryString } from "../../../types";
import { getRouter } from "../../../router";
import { parsePaletteSearch } from "../../../utils/route-search";
import { PaletteDataProvider, usePaletteData, PaletteContextProps } from "..";

const renderPaletteDataHook = (
  queryString?: Partial<PalettePageQueryString>,
  initialEntry = "/palette",
) => {
  const history = createMemoryHistory({ initialEntries: [initialEntry] });
  const router = getRouter();
  const wrapper = ({ children }: { children?: React.ReactNode }): React.ReactElement => (
    <RouterContextProvider history={history} router={router}>
      <PaletteDataProvider queryString={queryString}>{children}</PaletteDataProvider>
    </RouterContextProvider>
  );

  return {
    history,
    ...renderHook((): PaletteContextProps => usePaletteData(), { wrapper }),
  };
};

const normalizeContrast = (value: unknown): unknown => {
  if (typeof value === "number") {
    return Number(value.toFixed(12));
  }

  if (Array.isArray(value)) {
    return value.map(normalizeContrast);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== "algorithm" && key !== "apca")
        .map(([key, entry]) => [key, normalizeContrast(entry)]),
    );
  }

  return value;
};

const expectPaletteData = (actual: unknown, expected: unknown): void => {
  expect(normalizeContrast(actual)).toEqual(normalizeContrast(expected));
};

describe("usePaletteData hook", (): void => {
  let renderedHook: ReturnType<typeof renderPaletteDataHook>;

  beforeEach((): void => {
    renderedHook = renderPaletteDataHook();
  });

  it("should set context by default", (): void => {
    expect(renderedHook.result.current.paletteData.algorithm).toBe("wcag2");
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [],
      colors: [],
      hasError: false,
    });
  });

  it("should add a new colour", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("red");
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        { color: [255, 0, 0], combinations: [], hex: "#FF0000", model: "rgb", valpha: 1 },
      ],
      colors: ["red"],
      hasError: false,
    });
  });

  it("should add multiple colours", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("red, blue, green");
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [0, 0, 255],
              contrast: 2.148_936_170_212_766,
              hex: "#0000FF",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [0, 128, 0],
              contrast: 1.284_839_971_661_46,
              hex: "#008000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FF0000",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [0, 0, 255],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 0, 0],
              contrast: 2.148_936_170_212_766,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [0, 128, 0],
              contrast: 1.672_532_157_786_094_3,
              hex: "#008000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#0000FF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [0, 128, 0],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 0, 0],
              contrast: 1.284_839_971_661_46,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [0, 0, 255],
              contrast: 1.672_532_157_786_094_3,
              hex: "#0000FF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#008000",
          model: "rgb",
          valpha: 1,
        },
      ],
      colors: ["red", "blue", "green"],
      hasError: false,
    });
  });

  it("should handle commas and space separated colours", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("purple pink, orange");
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        {
          color: [128, 0, 128],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [255, 192, 203],
              contrast: 6.124_225_406_859_997,
              hex: "#FFC0CB",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [255, 165, 0],
              contrast: 4.769_614_668_743_367,
              hex: "#FFA500",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#800080",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [255, 192, 203],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [128, 0, 128],
              contrast: 6.124_225_406_859_997,
              hex: "#800080",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 165, 0],
              contrast: 1.284_008_422_523_894_1,
              hex: "#FFA500",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFC0CB",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [255, 165, 0],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [128, 0, 128],
              contrast: 4.769_614_668_743_367,
              hex: "#800080",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 192, 203],
              contrast: 1.284_008_422_523_894_1,
              hex: "#FFC0CB",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFA500",
          model: "rgb",
          valpha: 1,
        },
      ],
      colors: ["purple", "pink", "orange"],
      hasError: false,
    });
  });

  it("should handle hex", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("#fff #000");
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [0, 0, 0],
              contrast: 21,
              hex: "#000000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFFFFF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [0, 0, 0],
          combinations: [
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [255, 255, 255],
              contrast: 21,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#000000",
          model: "rgb",
          valpha: 1,
        },
      ],
      colors: ["#fff", "#000"],
      hasError: false,
    });
  });

  it("should handle a mix of hex and named colours", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("#fff, red");
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: true },
              color: [255, 0, 0],
              contrast: 3.998_476_770_753_998_5,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFFFFF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: true },
              color: [255, 255, 255],
              contrast: 3.998_476_770_753_998_5,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FF0000",
          model: "rgb",
          valpha: 1,
        },
      ],
      colors: ["#fff", "red"],
      hasError: false,
    });
  });

  it("should handle duplicates", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("#fff, white #000");
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 255, 255],
              contrast: 1,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [0, 0, 0],
              contrast: 21,
              hex: "#000000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFFFFF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 255, 255],
              contrast: 1,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [0, 0, 0],
              contrast: 21,
              hex: "#000000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFFFFF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [0, 0, 0],
          combinations: [
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [255, 255, 255],
              contrast: 21,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [255, 255, 255],
              contrast: 21,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#000000",
          model: "rgb",
          valpha: 1,
        },
      ],
      colors: ["#fff", "white", "#000"],
      hasError: false,
    });
  });

  it("should handle invalid colours", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("red blackness");
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [],
      colors: [],
      hasError: true,
    });
  });

  it("should handle a color change on first colour", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("orange, blue purple");
    });
    act((): void => {
      renderedHook.result.current.handleColorChange("red", 0);
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [0, 0, 255],
              contrast: 2.148_936_170_212_766,
              hex: "#0000FF",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [128, 0, 128],
              contrast: 2.355_641_379_714_500_6,
              hex: "#800080",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FF0000",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [0, 0, 255],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 0, 0],
              contrast: 2.148_936_170_212_766,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [128, 0, 128],
              contrast: 1.096_189_552_936_450_7,
              hex: "#800080",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#0000FF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [128, 0, 128],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 0, 0],
              contrast: 2.355_641_379_714_500_6,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [0, 0, 255],
              contrast: 1.096_189_552_936_450_7,
              hex: "#0000FF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#800080",
          model: "rgb",
          valpha: 1,
        },
      ],
      colors: ["red", "blue", "purple"],
      hasError: false,
    });
  });

  it("should handle a color change on the second colour", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("orange, blue purple");
    });
    act((): void => {
      renderedHook.result.current.handleColorChange("red", 1);
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        {
          color: [255, 165, 0],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 0, 0],
              contrast: 2.024_762_644_185_438_7,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [128, 0, 128],
              contrast: 4.769_614_668_743_367,
              hex: "#800080",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFA500",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 165, 0],
              contrast: 2.024_762_644_185_438_7,
              hex: "#FFA500",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [128, 0, 128],
              contrast: 2.355_641_379_714_500_6,
              hex: "#800080",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FF0000",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [128, 0, 128],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [255, 165, 0],
              contrast: 4.769_614_668_743_367,
              hex: "#FFA500",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 0, 0],
              contrast: 2.355_641_379_714_500_6,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#800080",
          model: "rgb",
          valpha: 1,
        },
      ],
      colors: ["orange", "red", "purple"],
      hasError: false,
    });
  });

  it("should handle a color change on any colour", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("orange, blue purple");
    });
    act((): void => {
      renderedHook.result.current.handleColorChange("red", 2);
    });
    expectPaletteData(renderedHook.result.current.paletteData, {
      colorCombos: [
        {
          color: [255, 165, 0],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: true },
              color: [0, 0, 255],
              contrast: 4.351_085_682_185_73,
              hex: "#0000FF",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 0, 0],
              contrast: 2.024_762_644_185_438_7,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFA500",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [0, 0, 255],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: true },
              color: [255, 165, 0],
              contrast: 4.351_085_682_185_73,
              hex: "#FFA500",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 0, 0],
              contrast: 2.148_936_170_212_766,
              hex: "#FF0000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#0000FF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [255, 0, 0],
          combinations: [
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [255, 165, 0],
              contrast: 2.024_762_644_185_438_7,
              hex: "#FFA500",
              model: "rgb",
              valpha: 1,
            },
            {
              accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
              color: [0, 0, 255],
              contrast: 2.148_936_170_212_766,
              hex: "#0000FF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FF0000",
          model: "rgb",
          valpha: 1,
        },
      ],
      colors: ["orange", "blue", "red"],
      hasError: false,
    });
  });

  it("should handle adding an invalid colour after colours have been added", (): void => {
    act((): void => {
      renderedHook.result.current.handleNewColor("red black");
    });

    const coloursCombos = renderedHook.result.current.paletteData.colorCombos;

    act((): void => {
      renderedHook.result.current.handleNewColor("blackness");
    });
    expect(renderedHook.result.current.paletteData.colorCombos).toEqual(coloursCombos);
    expect(renderedHook.result.current.paletteData.hasError).toBeTruthy();
  });

  it("honors a parsed algorithm without colors", (): void => {
    const { result } = renderPaletteDataHook({ algorithm: "apca" }, "/palette?algorithm=apca");
    expect(result.current.paletteData.algorithm).toBe("apca");
    expect(result.current.paletteData.colors).toStrictEqual([]);
  });

  it("falls back to WCAG for an invalid parsed algorithm", (): void => {
    const { result } = renderPaletteDataHook(
      parsePaletteSearch({ algorithm: "future" }),
      "/palette?algorithm=future",
    );
    expect(result.current.paletteData.algorithm).toBe("wcag2");
  });

  it("updates the algorithm and URL without changing colors", async (): Promise<void> => {
    const colors = ["#fff", "#000"];
    const { history, result } = renderPaletteDataHook(
      { colors },
      "/palette?colors=%23fff&colors=%23000",
    );
    const colorCombos = result.current.paletteData.colorCombos;

    act((): void => {
      result.current.handleAlgorithmChange("apca");
    });

    expect(result.current.paletteData.algorithm).toBe("apca");
    expect(result.current.paletteData.colors).toStrictEqual(colors);
    expect(result.current.paletteData.colorCombos).toBe(colorCombos);
    await waitFor((): void => {
      const search = new URLSearchParams(history.location.search);
      expect(search.get("algorithm")).toBe("apca");
      expect(search.get("colors")).toBe(JSON.stringify(colors));
    });

    act((): void => {
      result.current.handleAlgorithmChange("wcag2");
    });

    await waitFor((): void => {
      expect(new URLSearchParams(history.location.search).has("algorithm")).toBe(false);
    });
  });

  it("preserves APCA when colors update", async (): Promise<void> => {
    const { history, result } = renderPaletteDataHook(
      { algorithm: "apca", colors: ["#fff", "#000"] },
      "/palette?algorithm=apca&colors=%23fff&colors=%23000",
    );

    act((): void => {
      result.current.handleColorChange("#ccc", 0);
    });

    expect(result.current.paletteData.algorithm).toBe("apca");
    expect(result.current.paletteData.colors).toStrictEqual(["#ccc", "#000"]);
    await waitFor((): void => {
      expect(new URLSearchParams(history.location.search).get("algorithm")).toBe("apca");
    });
  });

  it("keeps real APCA data when colors are equal", (): void => {
    const { result } = renderPaletteDataHook(
      { algorithm: "apca", colors: ["#fff", "#fff"] },
      "/palette?algorithm=apca&colors=%23fff&colors=%23fff",
    );
    expect(result.current.paletteData.colors).toStrictEqual(["#fff", "#fff"]);
    expect(result.current.paletteData.colorCombos).toHaveLength(2);
    expect(result.current.paletteData.colorCombos[0]?.combinations[0]?.apca?.lc).toBe(0);
  });

  it("keeps real APCA data when a color is updated to match another", (): void => {
    const { result } = renderPaletteDataHook(
      { algorithm: "apca", colors: ["#fff", "#000"] },
      "/palette?algorithm=apca&colors=%23fff&colors=%23000",
    );

    act((): void => {
      result.current.handleColorChange("#fff", 1);
    });

    expect(result.current.paletteData.colors).toStrictEqual(["#fff", "#fff"]);
    expect(result.current.paletteData.colorCombos).toHaveLength(2);
    expect(result.current.paletteData.colorCombos[0]?.combinations[0]?.apca?.lc).toBe(0);
  });
});
/* eslint-enable react/display-name */
