import * as React from 'react';
import Color from 'color';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import qs from 'query-string';
import ColorCombos, { ColorCombosTypes, ColorCombinationTypes } from 'color-combos';
import { SiteData } from '../../types';

export interface HomeContextInterface {
  siteData: SiteData;
  handleBackgroundColorInputChange: (value: string) => void;
  handleTextColorInputChange: (value: string) => void;
}

interface SiteDataProviderProps {
  children?: React.ReactElement;
  initialSiteData: SiteData | {};
}

const setInitialContext = (initialSiteData: SiteData | {}): SiteData => {
  let textColor = '#FFFFFF';
  let background = '#1276CE';
  let isLight = false;
  if (!isEmpty(initialSiteData) && 'textColor' in initialSiteData) {
    textColor = initialSiteData.textColor;
    background = initialSiteData.background;
    isLight = JSON.parse((initialSiteData.isLight as unknown) as string);
  }

  const initialCombos = ColorCombos([textColor, background]) as ColorCombosTypes[];
  return {
    background: background,
    textColor: textColor,
    isLight,
    colorCombos: initialCombos,
  };
};

const checkBackgroundLightness = (hex: string): boolean => {
  let light;
  try {
    light = Color(hex).isLight();
  } catch (e) {
    light = true;
  }
  return light;
};

const isValidColor = (value: string): Color | false => {
  let color: Color | false = false;
  try {
    color = Color(value);
  } catch (error) {
    console.error('ColorInput invalid color');
  }
  return color;
};

const createFakeCombination = (color: number[], hex: string): ColorCombinationTypes => {
  return {
    model: 'rgb',
    color: color,
    valpha: 1,
    hex: hex,
    contrast: 1,
    accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false },
  };
};

const createDuplicateCombination = (combos: ColorCombosTypes[]): ColorCombosTypes[] => {
  const color = combos[0].color != null ? combos[0].color : [];
  const dupeCombo = {
    ...combos[0],
    combinations: [createFakeCombination(color, combos[0].hex)],
  };
  return [dupeCombo, dupeCombo];
};

const HomeContext = React.createContext<HomeContextInterface | null>(null);

const useSiteData = (): HomeContextInterface => {
  const context = React.useContext(HomeContext);
  if (!context) {
    throw new Error('useSiteData must be used with SiteDataProvider');
  }
  return context;
};

const SiteDataProvider: React.FunctionComponent<SiteDataProviderProps> = (
  props: SiteDataProviderProps
): React.ReactElement => {
  const [siteData, setSiteData] = React.useState<SiteData>(
    setInitialContext(props.initialSiteData)
  );

  const [isInitial, setIsInitial] = React.useState<boolean>(false);

  const [state] = React.useMemo(
    (): [SiteData, React.Dispatch<SiteData>] => [siteData, setSiteData],
    [siteData]
  );

  const updateHash = debounce((): void => {
    const query = '?' + qs.stringify(state as {});
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
    let newCombos: ColorCombosTypes[] | false = ColorCombos([textColor, backgroundColor]);
    if (newCombos) {
      if (textColor === backgroundColor) {
        newCombos = createDuplicateCombination(newCombos);
      }
      setSiteData({
        ...state,
        background: backgroundColor,
        colorCombos: newCombos,
        isLight: checkBackgroundLightness(backgroundColor),
        textColor: textColor,
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

  return (
    <HomeContext.Provider
      value={{
        siteData: state,
        handleBackgroundColorInputChange: handleBackgroundColorInputChange,
        handleTextColorInputChange: handleTextColorInputChange,
      }}
      {...props}
    />
  );
};

export { HomeContext, useSiteData, SiteDataProvider };
