import Color from 'color';
import { ColorCombinationTypes, ColorCombosTypes } from '../../types/index';

interface Options {
  threshold?: number;
  compact?: boolean;
  uniq?: boolean;
}

const ColorCombos = (
  colors: string[] | { [name: string]: string },
  options: Options = {}
): ColorCombosTypes[] | false => {
  let arr: Color[] = [];
  let results: ColorCombosTypes[] = [];

  const MINIMUMS: { aa: number; aaLarge: number; aaa: number; aaaLarge: number } = {
    aa: 4.5,
    aaLarge: 3,
    aaa: 7,
    aaaLarge: 4.5
  };

  const DEFAULT_OPTIONS: Options = {
    threshold: 0,
    compact: false,
    uniq: true
  };

  const combinedOptions = Object.assign<Options, Options>(DEFAULT_OPTIONS, options);

  if (!Array.isArray(colors)) {
    if (typeof colors === 'object') {
      for (const key in colors) {
        if (Object.prototype.hasOwnProperty.call(colors, key)) {
          arr.push(Color(colors[key]));
        }
      }

      if (combinedOptions.uniq) {
        arr = [...new Set(arr)];
      }
    } else {
      console.error('Must provide an array or object');
      return false;
    }
  } else {
    if (combinedOptions.uniq) {
      colors = [...new Set(colors)];
    }

    arr = colors.map((color): Color => Color(color));
  }

  results = arr.map(
    (color): ColorCombosTypes => {
      const result: ColorCombosTypes = combinedOptions.compact
        ? {}
        : Object.assign({}, color as any);

      result.hex = color.hex();

      result.combinations = arr
        .filter((bg): boolean => color !== bg)
        .filter((bg): boolean => color.contrast(bg) > combinedOptions.threshold!)
        .map(
          (bg): ColorCombinationTypes => {
            let combination: ColorCombinationTypes = combinedOptions.compact
              ? {}
              : Object.assign({}, bg as any);

            combination = Object.assign(combination, {
              hex: bg.hex(),
              contrast: color.contrast(bg)
            });

            combination.accessibility = {
              aa: combination.contrast! >= MINIMUMS.aa,
              aaLarge: combination.contrast! >= MINIMUMS.aaLarge,
              aaa: combination.contrast! >= MINIMUMS.aaa,
              aaaLarge: combination.contrast! >= MINIMUMS.aaaLarge
            };

            return combination;
          }
        );

      return result;
    }
  );

  return results;
};

export default ColorCombos;
