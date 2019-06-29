import React, { ReactElement } from 'react';
import { StyledRange } from './styled-range';

export interface FormRangeProps {
  defaultValue?: string;
  id: string;
  max: number;
  min: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number;
}

const FormRange: React.FC<FormRangeProps> = (
  props: FormRangeProps
): ReactElement<HTMLInputElement> => {
  return (
    <>
      <StyledRange
        defaultValue={props.defaultValue}
        id={props.id}
        max={props.max}
        min={props.min}
        onChange={props.onChange}
        onInput={props.onInput}
        value={props.value}
      />
    </>
  );
};

export default FormRange;
