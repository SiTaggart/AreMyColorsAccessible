import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { ColorCombosTypes } from 'color-combos';
import ColorCard from '../color-card';
import FormInput from '../form-input';
import HslSliders from '../hsl-sliders';

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

const ColorMatrix: React.FC<ColorMatrixProps> = (
  props: ColorMatrixProps
): ReactElement<HTMLDivElement> => {
  return (
    <StyledColorMatrix>
      <StyledColorMatrixTable>
        <thead>
          <StyledColorMatrixTr data-test="colorMatrix-tr">
            <td
              style={{
                width: '6rem'
              }}
            />
            {props.colorCombos.map(
              (color, index): ReactElement => (
                <StyledColorMatrixTh data-test="colorMatrix-th" key={index} scope="col">
                  <FormInput
                    ariaLabel="hex colour code"
                    css={{
                      marginBottom: '0.5rem'
                    }}
                    id={`colorhex-${index}`}
                    onChange={(e): void => props.onColorChange(e.target.value, index)}
                    value={props.colors[index]}
                  />
                  <HslSliders
                    id={`hsl-${index}`}
                    onChange={(hex): void => props.onColorChange(hex, index)}
                    value={color.hex}
                    variant="compact"
                  />
                </StyledColorMatrixTh>
              )
            )}
          </StyledColorMatrixTr>
        </thead>
        <tbody>
          {props.colorCombos.map(
            (color, index): ReactElement => (
              <StyledColorMatrixTr data-test="colorMatrix-tr" key={index}>
                <StyledColorMatrixTh data-test="colorMatrix-th" key={index} scope="row">
                  {color.hex}
                </StyledColorMatrixTh>
                {color.combinations.map(
                  (combo, comboIndex): ReactElement => (
                    <React.Fragment key={comboIndex}>
                      {index === comboIndex && <StyledColorMatrixTd>&nbsp;</StyledColorMatrixTd>}
                      <StyledColorMatrixTd
                        style={{
                          backgroundColor: combo.hex
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
};

export default ColorMatrix;
