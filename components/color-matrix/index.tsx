/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { ColorCombosTypes } from 'color-combos';
import { ColorCard } from '../color-card';
import { FormInput } from '../form-input';
import { HslSliders } from '../hsl-sliders';

export interface ColorMatrixProps {
  colors: string[];
  colorCombos: ColorCombosTypes[];
  onColorChange: (newColor: string, index: number) => void;
}

const StyledColorMatrix = styled.section`
  margin-top: 3rem;
  overflow-x: auto;
`;
const StyledColorMatrixTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
const StyledColorMatrixTr = styled.tr``;
const StyledColorMatrixTh = styled.th`
  font-weight: bold;
  padding: 0.5rem;

  &:first-of-type {
    padding-left: 0;
  }
`;
const StyledColorMatrixTd = styled.td`
  border: solid 1px #fff;
  padding: 0.5rem;
`;

const ColorMatrix: React.FC<ColorMatrixProps> = ({
  colorCombos,
  colors,
  onColorChange,
}: ColorMatrixProps): ReactElement<HTMLDivElement> => (
  <StyledColorMatrix>
    <StyledColorMatrixTable>
      <thead>
        <StyledColorMatrixTr data-test="colorMatrix-tr">
          <td
            style={{
              width: '6rem',
            }}
          />
          {colorCombos.map(
            (color, index): ReactElement => (
              <StyledColorMatrixTh key={index} data-test="colorMatrix-th" scope="col">
                <FormInput
                  ariaLabel="hex colour code"
                  css={{
                    marginBottom: '0.5rem',
                  }}
                  id={`colorhex-${index}`}
                  onChange={(e): void => onColorChange(e.target.value, index)}
                  value={colors[index]}
                />
                <HslSliders
                  id={`hsl-${index}`}
                  onChange={(hex): void => onColorChange(hex, index)}
                  value={color.hex}
                  variant="compact"
                />
              </StyledColorMatrixTh>
            )
          )}
        </StyledColorMatrixTr>
      </thead>
      <tbody>
        {colorCombos.map(
          (color, index): ReactElement => (
            <StyledColorMatrixTr key={index} data-test="colorMatrix-tr">
              <StyledColorMatrixTh data-test="colorMatrix-th" scope="row">
                {color.hex}
              </StyledColorMatrixTh>
              {color.combinations.map(
                (combo, comboIndex): ReactElement => (
                  <React.Fragment key={comboIndex}>
                    {index === comboIndex && <StyledColorMatrixTd>&nbsp;</StyledColorMatrixTd>}
                    <StyledColorMatrixTd
                      style={{
                        backgroundColor: combo.hex,
                      }}
                    >
                      <ColorCard
                        accessibility={combo.accessibility!}
                        color={color.hex}
                        contrast={combo.contrast!}
                      />
                    </StyledColorMatrixTd>
                  </React.Fragment>
                )
              )}
            </StyledColorMatrixTr>
          )
        )}
      </tbody>
    </StyledColorMatrixTable>
  </StyledColorMatrix>
);

export { ColorMatrix };
/* eslint-enable react/no-array-index-key */
