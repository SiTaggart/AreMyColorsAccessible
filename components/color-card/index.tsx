import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Levels } from '../../types';
import colorRating from '../../utils/color-rating';

export interface ColorCardProps {
  accessibility: Levels;
  background: string;
  color: string;
  contrast: number;
}

interface StyledColorCardProps {
  isNotImportant?: boolean;
}
const StyledColorCard = styled.div<StyledColorCardProps>`
  border: solid 1px #dedede;
  border-radius: 5px;
  overflow: hidden;
  opacity: ${(props): string | null => (props.isNotImportant ? '0.1' : null)};
  text-align: center;
  transition: opacity ease-in;
`;

interface StyledColorSwatchProps {
  backgroundColor: string;
  color: string;
}
const StyledColorSwatch = styled.div<StyledColorSwatchProps>`
  background-color: ${(props): string => props.backgroundColor};
  border-bottom: solid 1px #ccc;
  color: ${(props): string => props.color};
  font-weight: bold;
  font-size: 2rem;
  padding: 0.5rem 1rem;
`;

const StyledColorCardRatio = styled.div`
  font-size: 0.8rem;
  padding: 0.3rem;
`;

const ColorCard: React.FunctionComponent<ColorCardProps> = (
  props: ColorCardProps
): ReactElement<HTMLDivElement> => {
  const rating = colorRating(props.accessibility);

  return (
    <StyledColorCard data-test="colorCard">
      <StyledColorSwatch
        backgroundColor={props.background}
        color={props.color}
        data-test="colorCard-swatch"
      >
        {rating.overall}
      </StyledColorSwatch>
      <StyledColorCardRatio>
        <div>Small text: {rating.small}</div>
        <div>Large text: {rating.large}</div>
        <div>Contrast: {parseFloat(props.contrast.toFixed(2))}</div>
      </StyledColorCardRatio>
    </StyledColorCard>
  );
};

export default ColorCard;
