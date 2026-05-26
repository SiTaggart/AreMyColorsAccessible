import Color from 'color';
import ColorCombos, { ColorCombo } from 'color-combos';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';
import React from 'react';

import { PalettePageQueryString } from '../../types';

export interface PaletteContextProps {
  handleColorChange: (value: string, index: number) => void;
  handleNewColor: (colors: string) => void;
  paletteData: PaletteState;
  setPaletteData: React.Dispatch<React.SetStateAction<PaletteState>>;
}
interface PaletteState {
  colorCombos: Array<ColorCombo>;
  colors: Array<string>;
  hasError: boolean;
}
interface PaletteDataProviderProps {
  children?: React.ReactNode;
  queryString?: PalettePageQueryString;
}

const convertColorStringsToColors = (colorStrings: Array<string>): Array<Color> | false => {
  let isValidColor = true;
  const colorTypes: Array<Color> = [];

  // eslint-disable-next-line unicorn/no-array-for-each
  colorStrings.forEach((color: string): void => {
    try {
      colorTypes.push(Color(color));
    } catch {
      isValidColor = false;
    }
  });

  if (isValidColor) {
    return colorTypes;
  }
  return isValidColor;
};

const convertColorValuesToArray = (colors: string): Array<string> => {
  const colorsArr: Array<string> = colors.split(/[ ,]+/).filter(Boolean);
  const dedupedColors = colorsArr.filter(
    (color, index, self): boolean => self.indexOf(color) === index,
  );
  return dedupedColors;
};

const isValidColor = (hex: string): Color | false => {
  let color: Color | false = false;
  try {
    color = Color(hex);
  } catch {
    // not a valid colour
  }
  return color;
};

const getColorCombos = (colors: Array<string>): Array<ColorCombo> | false => ColorCombos(colors);

const getInitialState = (querystring: PalettePageQueryString | undefined): PaletteState => {
  let colors: Array<string> = [];
  let colorCombos: Array<ColorCombo> = [];

  if (querystring !== undefined && !isEmpty(querystring)) {
    colors = querystring.colors;
    colorCombos = getColorCombos(colors) as Array<ColorCombo>;
  }

  return {
    colorCombos,
    colors,
    hasError: false,
  };
};

const updateHash = debounce((state): void => {
  const query = `?${qs.stringify({ colors: state.colors })}`;
  window.history.pushState(state, 'Palette checker - Are My Colours Accessible', query);
}, 200);

// eslint-disable-next-line unicorn/no-useless-undefined
const PaletteContext = React.createContext<PaletteContextProps | undefined>(undefined);

const usePaletteData = (): PaletteContextProps => {
  const context = React.useContext(PaletteContext);
  if (!context) {
    throw new Error('usePaletteData must be used with PaletteDataProvider');
  }
  return context;
};

const PaletteDataProvider: React.FC<PaletteDataProviderProps> = ({
  children,
  queryString,
}: PaletteDataProviderProps): React.ReactElement => {
  const [paletteData, setPaletteData] = React.useState<PaletteState>(getInitialState(queryString));

  const [isInitial, setIsInitial] = React.useState<boolean>(false);

  const [state] = React.useMemo(
    (): [PaletteState, React.Dispatch<PaletteState>] => [paletteData, setPaletteData],
    [paletteData],
  );

  React.useEffect((): void => {
    if (isInitial) {
      updateHash(state);
    } else {
      setIsInitial(true);
    }
  }, [state]);

  const mergeColorsWithState = (colors: Array<string>): Array<string> => {
    const filteredColors: Array<string> = colors.filter(
      (color): boolean => !(state.colors as Array<string>).includes(color),
    );
    return [...state.colors, ...filteredColors];
  };

  const updateColors = (colors: Array<string>, valid: boolean): void => {
    let newColorCombos: Array<ColorCombo>;
    if (valid) {
      const combos = getColorCombos(colors);
      newColorCombos = combos === false ? state.colorCombos : combos;
    } else {
      newColorCombos = state.colorCombos;
    }
    setPaletteData({
      colorCombos: newColorCombos,
      colors,
      hasError: false,
    });
  };

  const handleColorChange = (value: string, index: number): void => {
    const newColors: Array<string> = [...state.colors];
    newColors[index] = value;
    updateColors(newColors, !!isValidColor(value));
  };

  const handleNewColor = (colors: string): void => {
    const colorsArray: Array<string> = convertColorValuesToArray(colors);
    const convertedColors: Array<Color> | false = convertColorStringsToColors(colorsArray);
    const mergedColors: Array<string> = mergeColorsWithState(colorsArray);

    if (convertedColors === false) {
      setPaletteData({ ...state, hasError: true });
    } else {
      updateColors(mergedColors, true);
    }
  };

  const providerValue = React.useMemo(
    () => ({
      handleColorChange,
      handleNewColor,
      paletteData: state,
      setPaletteData,
    }),
    [state],
  );

  return <PaletteContext.Provider value={providerValue}>{children}</PaletteContext.Provider>;
};

export { PaletteContext, usePaletteData, PaletteDataProvider };
