import React from 'react';
import './form-range.scss';

interface IFormRangeProps {
  defaultValue?: string;
  id: string;
  max: number;
  min: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number;
}

const FormRange: React.FunctionComponent<IFormRangeProps> = (props: IFormRangeProps) => {
  return (
    <input
      className="form-range"
      defaultValue={props.defaultValue}
      id={props.id}
      max={props.max}
      min={props.min}
      onChange={props.onChange}
      onInput={props.onInput}
      type="range"
      value={props.value}
    />
  );
};

export default FormRange;
