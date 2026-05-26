import React, { ReactElement } from "react";
import { StyledRange } from "./styled-range";

export interface FormRangeProps {
  defaultValue?: string;
  id: string;
  max: number;
  min: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: React.InputEventHandler<HTMLInputElement>;
  value?: number;
}

const FormRange: React.FC<FormRangeProps> = ({
  defaultValue,
  id,
  max,
  min,
  onChange,
  onInput,
  value,
}: FormRangeProps): ReactElement<HTMLInputElement> => (
  <StyledRange
    data-testid={id}
    defaultValue={defaultValue}
    id={id}
    max={max}
    min={min}
    onChange={onChange}
    onInput={onInput}
    type="range"
    value={value}
  />
);

export { FormRange };
