import React, { ReactElement } from 'react';
import FormLabel from '../form-label';
import FormRange from '../form-range';
import { HSLSlider, HSLSliderLabelContainer, HSLSliderRangeContainer } from './styled';

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

const HslSlider: React.FC<HslSliderProps> = (props: HslSliderProps): ReactElement => {
  return (
    <HSLSlider variant={props.variant}>
      <HSLSliderLabelContainer variant={props.variant}>
        <FormLabel htmlFor={props.id} variant={props.variant}>
          {props.variant === 'compact'
            ? `${props.label.substring(0, 1)}`
            : `${props.label} ${props.value + props.symbol}`}
        </FormLabel>
      </HSLSliderLabelContainer>
      <HSLSliderRangeContainer variant={props.variant}>
        <FormRange
          id={props.id}
          max={props.max}
          min={props.min}
          onChange={(e): void => props.onChange(e)}
          onInput={(e): void => props.onInput(e)}
          value={props.value}
        />
      </HSLSliderRangeContainer>
    </HSLSlider>
  );
};

export default HslSlider;
