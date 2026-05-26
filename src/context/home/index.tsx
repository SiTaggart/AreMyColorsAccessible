import Color from 'color';
import ColorCombos, { ColorCombo, Combination } from 'color-combos';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';
import React from 'react';

import { SiteData } from '../../types';

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
  let textColor = '#FFFFFF';
  let background = '#1276CE';
  let isLight = false;
  if (
    initialSiteData !== undefined &&
    !isEmpty(initialSiteData) &&
    'textColor' in initialSiteData
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
    // not a valid colour
  }
  return color;
};

const createFakeCombination = (color: Array<number>, hex: string): Combination => ({
  accessibility: { aa: false, aaa: false, aaaLarge: false, aaLarge: false },
  color,
  contrast: 1,
  hex,
  model: 'rgb',
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
    throw new Error('useSiteData must be used with SiteDataProvider');
  }
  return context;
};

const SiteDataProvider: React.FunctionComponent<SiteDataProviderProps> = ({
  initialSiteData,
  ...props
}: SiteDataProviderProps): React.ReactElement => {
  const [siteData, setSiteData] = React.useState<SiteData>(setInitialContext(initialSiteData));

  const [isInitial, setIsInitial] = React.useState<boolean>(false);

  const [state] = React.useMemo(
    (): [SiteData, React.Dispatch<SiteData>] => [siteData, setSiteData],
    [siteData],
  );

  const updateHash = debounce((): void => {
    const query = `?${qs.stringify({
      background: state.background,
      colorCombos: state.colorCombos,
      isLight: state.isLight,
      textColor: state.textColor,
    })}`;
    window.history.pushState(state, 'Are My Colors Accessible', query);
  }, 200);

  React.useEffect((): void => {
    if (isInitial) {
      updateHash();
    } else {
      setIsInitial(true);
    }
  }, [state]);

  const setNewColorCombo = (textColor: string, backgroundColor: string): void => {
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
  };

  const handleBackgroundColorInputChange = (value: string): void => {
    setSiteData({
      ...state,
      background: value,
    });
    if (isValidColor(value)) {
      setNewColorCombo(state.textColor, value);
    }
  };

  const handleTextColorInputChange = (value: string): void => {
    setSiteData({
      ...state,
      textColor: value,
    });
    if (isValidColor(value)) {
      setNewColorCombo(value, state.background);
    }
  };

  const providerValue = React.useMemo(
    () => ({
      handleBackgroundColorInputChange,
      handleTextColorInputChange,
      siteData: state,
    }),
    [state],
  );

  return <HomeContext.Provider value={providerValue} {...props} />;
};

export { HomeContext, useSiteData, SiteDataProvider };
