import { ColorPair } from "../../types";

export const ensureColorsAreAnArrayOfTwo = (colors: string | Array<string>): ColorPair | false => {
  let arrayOfColors = colors;
  if (typeof colors === "string") {
    try {
      arrayOfColors = JSON.parse(colors);
    } catch {
      return false;
    }
  }
  if (Array.isArray(arrayOfColors) && arrayOfColors.length === 2) {
    const [firstColor, secondColor] = arrayOfColors;
    return [firstColor, secondColor];
  }
  return false;
};
