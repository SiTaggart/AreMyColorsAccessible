/* eslint-disable react/display-name */
import * as React from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { createMemoryHistory, RouterContextProvider } from "@tanstack/react-router";
import type { HomePageQueryString } from "../../../types";
import { getRouter } from "../../../router";
import { parseSiteSearch } from "../../../utils/route-search";
import { SiteDataProvider, useSiteData, HomeContextInterface } from "..";

const renderSiteDataHook = (initialSiteData?: Partial<HomePageQueryString>, initialEntry = "/") => {
  const history = createMemoryHistory({ initialEntries: [initialEntry] });
  const router = getRouter();
  const wrapper = ({ children }: { children?: React.ReactNode }): React.ReactElement => (
    <RouterContextProvider history={history} router={router}>
      <SiteDataProvider initialSiteData={initialSiteData}>{children}</SiteDataProvider>
    </RouterContextProvider>
  );

  return {
    history,
    ...renderHook((): HomeContextInterface => useSiteData(), { wrapper }),
  };
};

const normalizeSiteData = (value: unknown): unknown => {
  if (typeof value === "number") {
    return Number(value.toFixed(12));
  }

  if (Array.isArray(value)) {
    return value.map(normalizeSiteData);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== "algorithm" && key !== "apca")
        .map(([key, entry]) => [key, normalizeSiteData(entry)]),
    );
  }

  return value;
};

const expectSiteData = (actual: unknown, expected: unknown): void => {
  expect(normalizeSiteData(actual)).toEqual(normalizeSiteData(expected));
};

describe("useSiteData hook", (): void => {
  it("should set context by default", (): void => {
    const { result } = renderSiteDataHook();
    expect(result.current.siteData.algorithm).toBe("wcag2");
    expectSiteData(result.current.siteData, {
      background: "#1276CE",
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [18, 118, 206],
              contrast: 4.658_034_537_943_552,
              hex: "#1276CE",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFFFFF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [255, 255, 255],
              contrast: 4.658_034_537_943_552,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#1276CE",
          model: "rgb",
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: "#FFFFFF",
    });
  });

  it("should set context when initial siteData is set", (): void => {
    const { result: initialContext } = renderSiteDataHook({
      background: "#111",
      isLight: true,
      textColor: "rgb(239,239,239)",
    });
    expectSiteData(initialContext.current.siteData, {
      background: "#111",
      colorCombos: [
        {
          color: [239, 239, 239],
          combinations: [
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [17, 17, 17],
              contrast: 16.422_098_411_346_187,
              hex: "#111111",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#EFEFEF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [17, 17, 17],
          combinations: [
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [239, 239, 239],
              contrast: 16.422_098_411_346_187,
              hex: "#EFEFEF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#111111",
          model: "rgb",
          valpha: 1,
        },
      ],
      isLight: true,
      textColor: "rgb(239,239,239)",
    });
  });

  it("should update siteData when background color is changed", (): void => {
    const { result } = renderSiteDataHook();

    act((): void => {
      result.current.handleBackgroundColorInputChange("#444");
    });

    expectSiteData(result.current.siteData, {
      background: "#444",
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [68, 68, 68],
              contrast: 9.739_769_120_526_205,
              hex: "#444444",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFFFFF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [68, 68, 68],
          combinations: [
            {
              accessibility: { aa: true, aaa: true, aaaLarge: true, aaLarge: true },
              color: [255, 255, 255],
              contrast: 9.739_769_120_526_205,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#444444",
          model: "rgb",
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: "#FFFFFF",
    });
  });

  it("should update siteData when text color is changed", (): void => {
    const { result } = renderSiteDataHook();
    act((): void => {
      result.current.handleTextColorInputChange("#000");
    });
    expectSiteData(result.current.siteData, {
      background: "#1276CE",
      colorCombos: [
        {
          color: [0, 0, 0],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [18, 118, 206],
              contrast: 4.508_339_263_897_164,
              hex: "#1276CE",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#000000",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [0, 0, 0],
              contrast: 4.508_339_263_897_164,
              hex: "#000000",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#1276CE",
          model: "rgb",
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: "#000",
    });
  });

  it("should keep current state when invalid colour is set as background color", (): void => {
    const { result } = renderSiteDataHook();
    act((): void => {
      result.current.handleBackgroundColorInputChange("blah");
    });

    expectSiteData(result.current.siteData, {
      background: "blah",
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [18, 118, 206],
              contrast: 4.658_034_537_943_552,
              hex: "#1276CE",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFFFFF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [255, 255, 255],
              contrast: 4.658_034_537_943_552,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#1276CE",
          model: "rgb",
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: "#FFFFFF",
    });
  });

  it("should keep current state when invalid colour is set as textColor color", (): void => {
    const { result } = renderSiteDataHook();
    act((): void => {
      result.current.handleTextColorInputChange("foo");
    });

    expectSiteData(result.current.siteData, {
      background: "#1276CE",
      colorCombos: [
        {
          color: [255, 255, 255],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [18, 118, 206],
              contrast: 4.658_034_537_943_552,
              hex: "#1276CE",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#FFFFFF",
          model: "rgb",
          valpha: 1,
        },
        {
          color: [18, 118, 206],
          combinations: [
            {
              accessibility: { aa: true, aaa: false, aaaLarge: true, aaLarge: true },
              color: [255, 255, 255],
              contrast: 4.658_034_537_943_552,
              hex: "#FFFFFF",
              model: "rgb",
              valpha: 1,
            },
          ],
          hex: "#1276CE",
          model: "rgb",
          valpha: 1,
        },
      ],
      isLight: false,
      textColor: "foo",
    });
  });

  it("honors a parsed algorithm without color params", (): void => {
    const { result } = renderSiteDataHook({ algorithm: "apca" });
    expect(result.current.siteData.algorithm).toBe("apca");
    expect(result.current.siteData.background).toBe("#1276CE");
    expect(result.current.siteData.textColor).toBe("#FFFFFF");
  });

  it("falls back to WCAG for an invalid parsed algorithm", (): void => {
    const { result } = renderSiteDataHook(parseSiteSearch({ algorithm: "future" }));
    expect(result.current.siteData.algorithm).toBe("wcag2");
  });

  it("updates the algorithm and URL without changing colors", async (): Promise<void> => {
    const initialSiteData = {
      background: "#000",
      isLight: false,
      textColor: "#fff",
    };
    const { history, result } = renderSiteDataHook(
      initialSiteData,
      "/?background=%23000&isLight=false&textColor=%23fff",
    );
    const colorCombos = result.current.siteData.colorCombos;

    act((): void => {
      result.current.handleAlgorithmChange("apca");
    });

    expect(result.current.siteData).toMatchObject({
      algorithm: "apca",
      background: "#000",
      textColor: "#fff",
    });
    expect(result.current.siteData.colorCombos).toBe(colorCombos);
    await waitFor((): void => {
      const search = new URLSearchParams(history.location.search);
      expect(search.get("algorithm")).toBe("apca");
      expect(search.get("background")).toBe("#000");
      expect(search.get("textColor")).toBe("#fff");
      expect(search.has("colorCombos")).toBe(false);
    });

    act((): void => {
      result.current.handleAlgorithmChange("wcag2");
    });

    await waitFor((): void => {
      expect(new URLSearchParams(history.location.search).has("algorithm")).toBe(false);
    });
  });

  it("keeps real APCA data when initial colors are equal", (): void => {
    const { result } = renderSiteDataHook({
      algorithm: "apca",
      background: "#fff",
      isLight: true,
      textColor: "#fff",
    });
    expect(result.current.siteData.colorCombos).toHaveLength(2);
    expect(result.current.siteData.colorCombos[0]?.combinations[0]?.apca?.lc).toBe(0);
  });

  it("keeps real APCA data when updated colors are equal", (): void => {
    const { result } = renderSiteDataHook();

    act((): void => {
      result.current.handleTextColorInputChange("#1276CE");
    });

    expect(result.current.siteData.colorCombos).toHaveLength(2);
    expect(result.current.siteData.colorCombos[0]?.combinations[0]?.apca?.lc).toBe(0);
  });
});
/* eslint-enable react/display-name */
