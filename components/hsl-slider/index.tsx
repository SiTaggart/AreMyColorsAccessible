import React, { ReactElement } from 'react';
import { FormLabel } from '../form-label';
import { FormRange } from '../form-range';
import { StyledHSLSlider, HSLSliderLabelContainer, HSLSliderRangeContainer } from './styled';

interface HslSliderProps {
  id: string;
  label: string;
  max: number;
  min: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  symbol: string;
  value: number | undefined;
  variant?: 'compact' | null;
}

const HSLSlider: React.FC<HslSliderProps> = ({
  variant,
  id,
  label,
  value,
  symbol,
  max,
  min,
  onChange,
  onInput,
}: HslSliderProps): ReactElement => (
  <StyledHSLSlider variant={variant}>
    <HSLSliderLabelContainer variant={variant}>
      <FormLabel htmlFor={id} variant={variant}>
        {variant === 'compact' ? `${label.slice(0, 1)}` : `${label} ${value + symbol}`}
      </FormLabel>
    </HSLSliderLabelContainer>
    <HSLSliderRangeContainer variant={variant}>
      <FormRange
        id={id}
        max={max}
        min={min}
        onChange={(e): void => onChange(e)}
        onInput={(e): void => onInput(e)}
        value={value}
      />
    </HSLSliderRangeContainer>
  </StyledHSLSlider>
);

export { HSLSlider };
