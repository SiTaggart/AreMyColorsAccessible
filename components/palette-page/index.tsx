import * as React from 'react';

import PaletteInput from '../palette-input';
import ColorMatrix from '../color-matrix';
import { usePaletteData } from '../../context/palette';

const PalettePage: React.FC<{}> = (): React.ReactElement => {
  const { paletteData, handleColorChange, handleNewColor } = usePaletteData();
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

export default PalettePage;
