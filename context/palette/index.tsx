import * as React from 'react';
import Color from 'color';
import ColorCombos from '../../utils/color-combos';
import { ColorCombosTypes } from '../../types';

export interface PaletteContextProps {
  paletteData: PaletteState;
  setPaletteData: React.Dispatch<React.SetStateAction<PaletteState>>;
  handleColorChange: (value: string, index: number) => void;
  handleNewColor: (colors: string) => void;
}
interface PaletteState {
  colors: string[];
  colorCombos: ColorCombosTypes[];
  hasError: boolean;
}
interface PaletteDataProviderProps {
  children?: React.ReactElement;
  queryString?: {};
}

const convertColorStringsToColors = (colorStrings: string[]): Color[] | false => {
  let isValidColor = true;
  const colorTypes: Color[] = [];

  colorStrings.forEach((color: string): void => {
    try {
      colorTypes.push(Color(color));
    } catch (error) {
      isValidColor = false;
    }
  });

  if (isValidColor) {
    return colorTypes;
  } else {
    return isValidColor;
  }
};

const convertColorValuesToArray = (colors: string): string[] => {
  const colorsArr: string[] = colors.split(/[ ,]+/).filter(Boolean);
  const dedupedColors = colorsArr.filter(
    (color, index, self): boolean => self.indexOf(color) === index
  );
  return dedupedColors;
};

const isValidColor = (hex: string): Color | false => {
  let color: Color | false = false;
  try {
    color = Color(hex);
  } catch (error) {}
  return color;
};

const PaletteContext = React.createContext<PaletteContextProps | null>(null);

const usePaletteData = (): PaletteContextProps => {
  const context = React.useContext(PaletteContext);
  if (!context) {
    throw new Error('usePaletteData must be used with PaletteDataProvider');
  }
  return context;
};

const PaletteDataProvider: React.FC<PaletteDataProviderProps> = (
  props: PaletteDataProviderProps
): React.ReactElement => {
  const [paletteData, setPaletteData] = React.useState<PaletteState>({
    colors: [],
    colorCombos: [],
    hasError: false
  });

  console.log('queryString:', props.queryString);

  const [state] = React.useMemo(
    (): [PaletteState, React.Dispatch<PaletteState>] => [paletteData, setPaletteData],
    [paletteData]
  );

  const mergeColorsWithState = (colors: string[]): string[] => {
    const filteredColors: string[] = colors.filter(
      (color): boolean => (state.colors as string[]).indexOf(color) < 0
    );
    return [...state.colors, ...filteredColors];
  };

  const getColorCombos = (colors: string[]): ColorCombosTypes[] | false => {
    return ColorCombos(colors);
  };

  const updateColors = (colors: string[], isValidColor: boolean): void => {
    let newColorCombos: ColorCombosTypes[];
    if (isValidColor) {
      const combos = getColorCombos(colors);
      if (combos !== false) {
        newColorCombos = combos;
      } else {
        newColorCombos = state.colorCombos;
      }
    } else {
      newColorCombos = state.colorCombos;
    }
    setPaletteData({
      colors,
      colorCombos: newColorCombos,
      hasError: false
    });
  };

  const handleColorChange = (value: string, index: number): void => {
    const newColors: string[] = [...state.colors];
    newColors[index] = value;
    updateColors(newColors, !!isValidColor(value));
  };

  const handleNewColor = (colors: string): void => {
    const colorsArray: string[] = convertColorValuesToArray(colors);
    const convertedColors: Color[] | false = convertColorStringsToColors(colorsArray);
    const mergedColors: string[] = mergeColorsWithState(colorsArray);

    if (convertedColors !== false) {
      updateColors(mergedColors, true);
    } else {
      setPaletteData({ ...state, hasError: true });
    }
  };

  return (
    <PaletteContext.Provider
      value={{
        paletteData: state,
        setPaletteData,
        handleColorChange,
        handleNewColor
      }}
      {...props}
    >
      {props.children}
    </PaletteContext.Provider>
  );
};

export { PaletteContext, usePaletteData, PaletteDataProvider };
