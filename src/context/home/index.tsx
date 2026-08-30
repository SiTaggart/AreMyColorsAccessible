import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import Color from "color";
import ColorCombos, { ColorCombo } from "color-combos";
import { ContrastAlgorithm, HomePageQueryString, SiteData } from "../../types";

export interface HomeContextInterface {
  handleBackgroundColorInputChange: (value: string) => void;
  handleAlgorithmChange: (algorithm: ContrastAlgorithm) => void;
  handleTextColorInputChange: (value: string) => void;
  siteData: SiteData;
}

interface SiteDataProviderProps {
  children?: React.ReactNode;
  initialSiteData?: Partial<SiteData>;
}

const checkBackgroundLightness = (hex: string): boolean => {
  let light;
  try {
    light = Color(hex).isLight();
  } catch {
    light = true;
  }
  return light;
};

const isValidColor = (value: string): Color | false => {
  let color: Color | false = false;
  try {
    color = Color(value);
  } catch {
    return false;
  }
  return color;
};

const getColorCombos = (colors: Array<string>): Array<ColorCombo> => {
  const combos = ColorCombos(colors, { uniq: false });
  return combos === false ? [] : combos;
};

const setInitialContext = (initialSiteData: Partial<SiteData> | undefined): SiteData => {
  const algorithm = initialSiteData?.algorithm ?? "wcag2";
  let textColor = "#FFFFFF";
  let background = "#1276CE";
  let isLight = false;
  if (
    initialSiteData !== undefined &&
    typeof initialSiteData.textColor === "string" &&
    typeof initialSiteData.background === "string" &&
    isValidColor(initialSiteData.textColor) &&
    isValidColor(initialSiteData.background)
  ) {
    textColor = initialSiteData.textColor;
    background = initialSiteData.background;
    isLight =
      typeof initialSiteData.isLight === "boolean"
        ? initialSiteData.isLight
        : checkBackgroundLightness(background);
  }

  return {
    algorithm,
    background,
    colorCombos: getColorCombos([textColor, background]),
    isLight,
    textColor,
  };
};

const getHomeSearch = (siteData: SiteData): HomePageQueryString => {
  const { algorithm, background, isLight, textColor } = siteData;
  return {
    ...(algorithm === "apca" ? { algorithm } : {}),
    background,
    isLight,
    textColor,
  };
};

// eslint-disable-next-line unicorn/no-useless-undefined
const HomeContext = React.createContext<HomeContextInterface | undefined>(undefined);

const useSiteData = (): HomeContextInterface => {
  const context = React.useContext(HomeContext);
  if (!context) {
    throw new Error("useSiteData must be used with SiteDataProvider");
  }
  return context;
};

const SiteDataProvider: React.FunctionComponent<SiteDataProviderProps> = ({
  initialSiteData,
  ...props
}: SiteDataProviderProps): React.ReactElement => {
  const [siteData, setSiteData] = React.useState<SiteData>(setInitialContext(initialSiteData));
  const navigate = useNavigate({ from: "/" });

  const updateSearch = React.useCallback(
    (nextState: SiteData): void => {
      void navigate({
        replace: true,
        search: getHomeSearch(nextState),
      });
    },
    [navigate],
  );

  const setNewColorCombo = React.useCallback(
    (textColor: string, backgroundColor: string): void => {
      const nextState = {
        ...siteData,
        background: backgroundColor,
        colorCombos: getColorCombos([textColor, backgroundColor]),
        isLight: checkBackgroundLightness(backgroundColor),
        textColor,
      };
      setSiteData(nextState);
      updateSearch(nextState);
    },
    [siteData, updateSearch],
  );

  const handleBackgroundColorInputChange = React.useCallback(
    (value: string): void => {
      const nextState = {
        ...siteData,
        background: value,
      };
      if (isValidColor(value)) {
        setNewColorCombo(siteData.textColor, value);
      } else {
        setSiteData(nextState);
        updateSearch(nextState);
      }
    },
    [setNewColorCombo, siteData, updateSearch],
  );

  const handleTextColorInputChange = React.useCallback(
    (value: string): void => {
      const nextState = {
        ...siteData,
        textColor: value,
      };
      if (isValidColor(value)) {
        setNewColorCombo(value, siteData.background);
      } else {
        setSiteData(nextState);
        updateSearch(nextState);
      }
    },
    [setNewColorCombo, siteData, updateSearch],
  );

  const handleAlgorithmChange = React.useCallback(
    (algorithm: ContrastAlgorithm): void => {
      setSiteData((currentState) => ({
        ...currentState,
        algorithm,
      }));
      void navigate({
        replace: true,
        search: (currentSearch) => ({
          ...currentSearch,
          algorithm: algorithm === "apca" ? algorithm : undefined,
        }),
      });
    },
    [navigate],
  );

  const providerValue = React.useMemo(
    () => ({
      handleAlgorithmChange,
      handleBackgroundColorInputChange,
      handleTextColorInputChange,
      siteData,
    }),
    [handleAlgorithmChange, handleBackgroundColorInputChange, handleTextColorInputChange, siteData],
  );

  return <HomeContext.Provider value={providerValue} {...props} />;
};

export { HomeContext, useSiteData, SiteDataProvider };
