import * as React from "react";
import styled from "@emotion/styled";

import { PaletteInput } from "../palette-input";
import { ColorMatrix } from "../color-matrix";
import { usePaletteData } from "../../context/palette";
import { ContrastAlgorithmToggle } from "../contrast-algorithm-toggle";

const StyledAlgorithmRow = styled.div`
  margin: 1.5rem auto 0.5rem;
  max-width: 1200px;
  padding: 0 1rem;
  text-align: center;
`;

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
      <StyledAlgorithmRow>
        <ContrastAlgorithmToggle
          algorithm={paletteData.algorithm}
          align="center"
          onChange={handleAlgorithmChange}
        />
      </StyledAlgorithmRow>
      <ColorMatrix
        algorithm={paletteData.algorithm}
        colorCombos={paletteData.colorCombos}
        colors={paletteData.colors}
        onColorChange={handleColorChange}
      />
    </>
  );
};

export { PalettePage };
