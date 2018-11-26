import React from 'react';
import './index.scss';

interface IFormRangeProps {
  defaultValue: string;
  id: string;
  max: number;
  min: number;
  onInput: (args: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRange: React.FunctionComponent<IFormRangeProps> = (props: IFormRangeProps) => {
  return (
    <input
      className="form-range"
      defaultValue={props.defaultValue}
      id={props.id}
      max={props.max}
      min={props.min}
      onInput={props.onInput}
      type="range"
    />
  );
};

export default FormRange;
