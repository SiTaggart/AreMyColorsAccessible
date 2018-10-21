import Color from 'color';

interface Options {
  threshold?: number;
  compact?: boolean;
  uniq?: boolean;
}

const MINIMUMS: { aa: number; aaLarge: number; aaa: number; aaaLarge: number } = {
  aa: 4.5,
  aaLarge: 3,
  aaa: 7,
  aaaLarge: 4.5
};

const ColorCombos = (
  colors: Array<string> | { [name: string]: string },
  options: Options = {}
): Array<any> | false => {
  let arr: Array<any> = [];
  let results: Array<any> = [];

  const DEFAULT_OPTIONS: Options = {
    threshold: 0,
    compact: false,
    uniq: true
  };

  options = Object.assign(DEFAULT_OPTIONS, options);

  if (!Array.isArray(colors)) {
    if (typeof colors === 'object') {
      for (const key in colors) {
        if (colors.hasOwnProperty(key)) {
          arr.push(Color(colors[key]));
        }
      }

      if (options.uniq) {
        arr = [...new Set(arr)];
      }
    } else {
      console.log('Must provide an array or object');
      return false;
    }
  } else {
    if (options.uniq) {
      colors = [...new Set(colors)];
    }
    arr = colors.map(color => Color(color));
  }

  results = arr.map(color => {
    var result = options.compact ? {} : Object.assign({}, color);
    result.hex = color.hex();
    result.combinations = arr
      .filter(bg => color !== bg)
      .filter(bg => color.contrast(bg) > options.threshold)
      .map(bg => {
        let combination = options.compact ? {} : Object.assign({}, bg);
        combination = Object.assign(combination, {
          hex: bg.hex(),
          contrast: color.contrast(bg)
        });
        combination.accessibility = {
          aa: combination.contrast >= MINIMUMS.aa,
          aaLarge: combination.contrast >= MINIMUMS.aaLarge,
          aaa: combination.contrast >= MINIMUMS.aaa,
          aaaLarge: combination.contrast >= MINIMUMS.aaaLarge
        };
        return combination;
      });
    return result;
  });

  return results;
};

export default ColorCombos;
