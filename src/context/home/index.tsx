import * as React from "react";
import Color from "color";
import isEmpty from "lodash/isEmpty";
import debounce from "lodash/debounce";
import qs from "query-string";
import ColorCombos, { ColorCombo, Combination } from "color-combos";
import { SiteData } from "../../types";

export interface HomeContextInterface {
  handleBackgroundColorInputChange: (value: string) => void;
  handleTextColorInputChange: (value: string) => void;
  siteData: SiteData;
}

interface SiteDataProviderProps {
  children?: React.ReactNode;
  initialSiteData?: SiteData;
}

const setInitialContext = (initialSiteData: SiteData | undefined): SiteData => {
  let textColor = "#FFFFFF";
  let background = "#1276CE";
  let isLight = false;
  if (
    initialSiteData !== undefined &&
    !isEmpty(initialSiteData) &&
    "textColor" in initialSiteData
  ) {
    textColor = initialSiteData.textColor;
    background = initialSiteData.background;
    isLight = JSON.parse(initialSiteData.isLight as unknown as string);
  }

  const initialCombos = ColorCombos([textColor, background]) as Array<ColorCombo>;
  return {
    background,
    colorCombos: initialCombos,
    isLight,
    textColor,
  };
};

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

const createFakeCombination = (color: Array<number>, hex: string): Combination => ({
  accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
  color,
  contrast: 1,
  hex,
  model: "rgb",
  valpha: 1,
});

const createDuplicateCombination = (combos: Array<ColorCombo>): Array<ColorCombo> => {
  const color = combos[0].color === undefined ? [] : combos[0].color;
  const dupeCombo = {
    ...combos[0],
    combinations: [createFakeCombination(color, combos[0].hex)],
  };
  return [dupeCombo, dupeCombo];
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

  const isInitial = React.useRef<boolean>(false);

  const [state] = React.useMemo(
    (): [SiteData, React.Dispatch<SiteData>] => [siteData, setSiteData],
    [siteData],
  );

  const updateHash = React.useMemo(
    () =>
      debounce((nextState: SiteData): void => {
        const query = `?${qs.stringify({
          background: nextState.background,
          colorCombos: nextState.colorCombos,
          isLight: nextState.isLight,
          textColor: nextState.textColor,
        })}`;
        window.history.pushState(nextState, "Are My Colors Accessible", query);
      }, 200),
    [],
  );

  React.useEffect((): void => {
    if (isInitial.current) {
      updateHash(state);
    } else {
      isInitial.current = true;
    }
  }, [state, updateHash]);

  const setNewColorCombo = React.useCallback(
    (textColor: string, backgroundColor: string): void => {
      let newCombos: Array<ColorCombo> | false = ColorCombos([textColor, backgroundColor]);
      if (newCombos) {
        if (textColor === backgroundColor) {
          newCombos = createDuplicateCombination(newCombos);
        }
        setSiteData({
          ...state,
          background: backgroundColor,
          colorCombos: newCombos,
          isLight: checkBackgroundLightness(backgroundColor),
          textColor,
        });
      }
    },
    [state],
  );

  const handleBackgroundColorInputChange = React.useCallback(
    (value: string): void => {
      setSiteData({
        ...state,
        background: value,
      });
      if (isValidColor(value)) {
        setNewColorCombo(state.textColor, value);
      }
    },
    [setNewColorCombo, state],
  );

  const handleTextColorInputChange = React.useCallback(
    (value: string): void => {
      setSiteData({
        ...state,
        textColor: value,
      });
      if (isValidColor(value)) {
        setNewColorCombo(value, state.background);
      }
    },
    [setNewColorCombo, state],
  );

  const providerValue = React.useMemo(
    () => ({
      handleBackgroundColorInputChange,
      handleTextColorInputChange,
      siteData: state,
    }),
    [handleBackgroundColorInputChange, handleTextColorInputChange, state],
  );

  return <HomeContext.Provider value={providerValue} {...props} />;
};

export { HomeContext, useSiteData, SiteDataProvider };
