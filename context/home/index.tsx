import * as React from 'react';
import Color from 'color';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import qs from 'query-string';
import ColorCombos, { ColorCombo, Combination } from 'color-combos';
import { SiteData } from '../../types';

export interface HomeContextInterface {
  siteData: SiteData;
  handleBackgroundColorInputChange: (value: string) => void;
  handleTextColorInputChange: (value: string) => void;
}

interface SiteDataProviderProps {
  children?: React.ReactElement;
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

  const initialCombos = ColorCombos([textColor, background]) as ColorCombo[];
  return {
    background,
    textColor,
    isLight,
    colorCombos: initialCombos,
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
    console.error('ColorInput invalid color');
  }
  return color;
};

const createFakeCombination = (color: number[], hex: string): Combination => ({
  model: 'rgb',
  color,
  valpha: 1,
  hex,
  contrast: 1,
  accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
});

const createDuplicateCombination = (combos: ColorCombo[]): ColorCombo[] => {
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
    [siteData]
  );

  const updateHash = debounce((): void => {
    const query = `?${qs.stringify(state as { [key: string]: any })}`;
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
    let newCombos: ColorCombo[] | false = ColorCombos([textColor, backgroundColor]);
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
      siteData: state,
      handleBackgroundColorInputChange,
      handleTextColorInputChange,
    }),
    [state]
  );

  return <HomeContext.Provider value={providerValue} {...props} />;
};

export { HomeContext, useSiteData, SiteDataProvider };
