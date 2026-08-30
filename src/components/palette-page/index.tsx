import * as React from "react";

import { PaletteInput } from "../palette-input";
import { ColorMatrix } from "../color-matrix";
import { usePaletteData } from "../../context/palette";
import { ContrastAlgorithmToggle } from "../contrast-algorithm-toggle";

const PalettePage: React.FC = (): React.ReactElement => {
  const { handleAlgorithmChange, handleColorChange, handleNewColor, paletteData } =
    usePaletteData();
  return (
    <>
      <PaletteInput
        errorMessage={
          paletteData.hasError
            ? "Please enter valid colors as comma or space separated hex values"
            : undefined
        }
        onColorAdd={handleNewColor}
      />
      <ContrastAlgorithmToggle algorithm={paletteData.algorithm} onChange={handleAlgorithmChange} />
      <ColorMatrix
        colorCombos={paletteData.colorCombos}
        colors={paletteData.colors}
        onColorChange={handleColorChange}
      />
    </>
  );
};

export { PalettePage };
