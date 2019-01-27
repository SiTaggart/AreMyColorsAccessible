import React from 'react';
import classNames from 'classnames';
import './form-input.scss';

export interface IFormInputProps {
  ariaLabel?: string;
  defaultValue?: string;
  errorMessage?: string;
  id: string;
  hasNoSpacing?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: {};
  value?: string;
}

const FormInput: React.FunctionComponent<IFormInputProps> = props => {
  return (
    <>
      <input
        aria-describedby={props.errorMessage && `error-message-label-${props.id}`}
        aria-label={props.ariaLabel}
        autoComplete="off"
        className={classNames('form-input', {
          'form-input--error': props.errorMessage,
          'form-input--noSpacing': props.hasNoSpacing
        })}
        defaultValue={props.defaultValue}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        onInput={props.onInput}
        placeholder={props.placeholder}
        style={props.style}
        type="text"
        value={props.value}
      />
      {props.errorMessage && (
        <div className="form-input-error" id={`error-message-label-${props.id}`}>
          {props.errorMessage}
        </div>
      )}
    </>
  );
};

export default FormInput;
