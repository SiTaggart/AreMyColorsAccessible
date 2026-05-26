import React from 'react';

import { usePaletteData } from '../../context/palette';
import { ColorMatrix } from '../color-matrix';
import { PaletteInput } from '../palette-input';

const PalettePage: React.FC = (): React.ReactElement => {
  const { handleColorChange, handleNewColor, paletteData } = usePaletteData();
  return (
    <>
      <PaletteInput
        errorMessage={
          paletteData.hasError
            ? 'Please enter valid colors as comma or space separated hex values'
            : undefined
        }
        onColorAdd={handleNewColor}
      />
      <ColorMatrix
        colorCombos={paletteData.colorCombos}
        colors={paletteData.colors}
        onColorChange={handleColorChange}
      />
    </>
  );
};

export { PalettePage };
