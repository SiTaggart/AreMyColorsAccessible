import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import Color from "color";
import ColorCombos, { ColorCombo } from "color-combos";
import { ContrastAlgorithm, PalettePageQueryString } from "../../types";

export interface PaletteContextProps {
  handleAlgorithmChange: (algorithm: ContrastAlgorithm) => void;
  handleColorChange: (value: string, index: number) => void;
  handleNewColor: (colors: string) => void;
  paletteData: PaletteState;
  setPaletteData: React.Dispatch<React.SetStateAction<PaletteState>>;
}
export interface PaletteState {
  algorithm: ContrastAlgorithm;
  colorCombos: Array<ColorCombo>;
  colors: Array<string>;
  hasError: boolean;
}
interface PaletteDataProviderProps {
  children?: React.ReactNode;
  queryString?: Partial<PalettePageQueryString>;
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
    return false;
  }
  return color;
};

const getColorCombos = (colors: Array<string>): Array<ColorCombo> | false =>
  ColorCombos(colors, { uniq: false });

const getInitialState = (
  querystring: Partial<PalettePageQueryString> | undefined,
): PaletteState => {
  const algorithm = querystring?.algorithm ?? "wcag2";
  let colors: Array<string> = [];
  let colorCombos: Array<ColorCombo> = [];
  const queryColors = querystring?.colors;

  if (Array.isArray(queryColors)) {
    const initialColorCombos = getColorCombos(queryColors);
    if (initialColorCombos) {
      colors = queryColors;
      colorCombos = initialColorCombos;
    }
  }

  return {
    algorithm,
    colorCombos,
    colors,
    hasError: false,
  };
};

const getPaletteSearch = (state: PaletteState): PalettePageQueryString => ({
  ...(state.algorithm === "apca" ? { algorithm: state.algorithm } : {}),
  colors: state.colors,
});

// eslint-disable-next-line unicorn/no-useless-undefined
const PaletteContext = React.createContext<PaletteContextProps | undefined>(undefined);

const usePaletteData = (): PaletteContextProps => {
  const context = React.useContext(PaletteContext);
  if (!context) {
    throw new Error("usePaletteData must be used with PaletteDataProvider");
  }
  return context;
};

const PaletteDataProvider: React.FC<PaletteDataProviderProps> = ({
  children,
  queryString,
}: PaletteDataProviderProps): React.ReactElement => {
  const [paletteData, setPaletteData] = React.useState<PaletteState>(getInitialState(queryString));
  const navigate = useNavigate({ from: "/palette" });

  const updateSearch = React.useCallback(
    (nextState: PaletteState): void => {
      void navigate({
        replace: true,
        search: getPaletteSearch(nextState),
      });
    },
    [navigate],
  );

  const mergeColorsWithState = React.useCallback(
    (colors: Array<string>): Array<string> => {
      const filteredColors: Array<string> = colors.filter(
        (color): boolean => !paletteData.colors.includes(color),
      );
      return [...paletteData.colors, ...filteredColors];
    },
    [paletteData.colors],
  );

  const updateColors = React.useCallback(
    (colors: Array<string>, valid: boolean): void => {
      let newColorCombos: Array<ColorCombo>;
      if (valid) {
        const combos = getColorCombos(colors);
        newColorCombos = combos === false ? paletteData.colorCombos : combos;
      } else {
        newColorCombos = paletteData.colorCombos;
      }
      const nextState = {
        ...paletteData,
        colorCombos: newColorCombos,
        colors,
        hasError: false,
      };
      setPaletteData(nextState);
      updateSearch(nextState);
    },
    [paletteData, updateSearch],
  );

  const handleColorChange = React.useCallback(
    (value: string, index: number): void => {
      const newColors: Array<string> = [...paletteData.colors];
      newColors[index] = value;
      updateColors(newColors, !!isValidColor(value));
    },
    [paletteData.colors, updateColors],
  );

  const handleNewColor = React.useCallback(
    (colors: string): void => {
      const colorsArray: Array<string> = convertColorValuesToArray(colors);
      const convertedColors: Array<Color> | false = convertColorStringsToColors(colorsArray);
      const mergedColors: Array<string> = mergeColorsWithState(colorsArray);

      if (convertedColors === false) {
        setPaletteData({ ...paletteData, hasError: true });
      } else {
        updateColors(mergedColors, true);
      }
    },
    [mergeColorsWithState, paletteData, updateColors],
  );

  const handleAlgorithmChange = React.useCallback(
    (algorithm: ContrastAlgorithm): void => {
      const nextState = {
        ...paletteData,
        algorithm,
      };
      setPaletteData(nextState);
      updateSearch(nextState);
    },
    [paletteData, updateSearch],
  );

  const providerValue = React.useMemo(
    () => ({
      handleAlgorithmChange,
      handleColorChange,
      handleNewColor,
      paletteData,
      setPaletteData,
    }),
    [handleAlgorithmChange, handleColorChange, handleNewColor, paletteData],
  );

  return <PaletteContext.Provider value={providerValue}>{children}</PaletteContext.Provider>;
};

export { PaletteContext, usePaletteData, PaletteDataProvider };
