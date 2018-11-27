import React from 'react';
import classNames from 'classnames';
import './form-input.scss';

interface IFormInputProps {
  ariaLabel?: string;
  defaultValue?: string;
  errorMessage?: string;
  id: string;
  name?: string;
  onChange?: (args: React.ChangeEvent<HTMLInputElement>) => void;
  style?: {};
  value?: string;
}

const FormInput: React.FunctionComponent<IFormInputProps> = (props: IFormInputProps) => {
  return (
    <>
      <input
        aria-describedby={props.errorMessage && 'error-message-label'}
        aria-label={props.ariaLabel}
        autoComplete="off"
        className={classNames('form-input', {
          'form-input--error': props.errorMessage
        })}
        defaultValue={props.defaultValue}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        style={props.style}
        type="text"
        value={props.value}
      />
      {props.errorMessage && (
        <div className="form-input-error" id="error-message-label">
          {props.errorMessage}
        </div>
      )}
    </>
  );
};

export default FormInput;
