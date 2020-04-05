import React, { ReactElement } from 'react';
import styled, { CSSObject } from '@emotion/styled';
import { Levels } from '../../types';
import { colorRating } from '../../utils/color-rating';

export interface ColorCardProps {
  accessibility: Levels;
  color: string;
  contrast: number;
  isNotImportant?: boolean;
}

interface StyledColorCardProps {
  isNotImportant?: boolean;
}
const StyledColorCard = styled.div<StyledColorCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 8rem;
  min-width: 12rem;
  overflow: hidden;
  opacity: ${(props): string | null => (props.isNotImportant ? '0.1' : null)};
  text-align: center;
  transition: opacity ease-in;
`;

export const StyledCardRow = styled.div<{}>`
  display: flex;
  justify-content: space-between;
`;

interface StyledColorSwatchProps {
  color: string;
}
const StyledColorSwatch = styled.div<StyledColorSwatchProps>`
  color: ${(props): string => props.color};
  flex: 1;
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
`;

interface StyledColorCardPillProps {
  status?: 'success' | 'error';
}
const getStatusStyles = (props: StyledColorCardPillProps): CSSObject => {
  switch (props.status) {
    case 'success':
      return { backgroundColor: '#CFFCDA', color: '#004215' };
    case 'error':
      return { backgroundColor: '#FBDBDB', color: '#C52020' };
    default:
      return { backgroundColor: '#F7F8F8', color: '#666D70' };
  }
};
const StyledColorCardPill = styled.span<StyledColorCardPillProps>`
  ${getStatusStyles};
  border-radius: 3px;
  display: inline-block;
  font-size: 12px;
  padding: 1px 4px;
`;

const ColorCard: React.FC<ColorCardProps> = ({
  accessibility,
  isNotImportant,
  contrast,
  color,
}: ColorCardProps): ReactElement<HTMLDivElement> => {
  const rating = colorRating(accessibility);

  return (
    <StyledColorCard data-testid="colorCard" isNotImportant={isNotImportant}>
      <StyledCardRow>
        <StyledColorCardPill title="Color contrast ratio">
          {Number.parseFloat(contrast.toFixed(2))} : 1
        </StyledColorCardPill>
      </StyledCardRow>
      <StyledCardRow>
        <StyledColorSwatch color={color} data-testid="colorCard-swatch">
          {rating.overall}
        </StyledColorSwatch>
      </StyledCardRow>
      <StyledCardRow>
        <StyledColorCardPill status={rating.small === 'Fail' ? 'error' : 'success'}>
          Small: {rating.small}
        </StyledColorCardPill>
        <StyledColorCardPill status={rating.large === 'Fail' ? 'error' : 'success'}>
          Large: {rating.large}
        </StyledColorCardPill>
      </StyledCardRow>
    </StyledColorCard>
  );
};

export { ColorCard };
