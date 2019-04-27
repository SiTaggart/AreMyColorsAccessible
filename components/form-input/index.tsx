import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

export interface FormInputProps {
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

interface StyledInputProps {
  isErrored?: boolean;
  hasNoSpacing?: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  background: rgba(255, 255, 255, 0.1);
  border: solid 1px;
  border-color: ${(props): string | null => (props.isErrored ? '#c12915' : null)};
  border-radius: 3px;
  color: ${(props): string | null => (props.isErrored ? '#c12915' : null)};
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  margin-bottom: ${(props): string => (props.hasNoSpacing ? '0' : '2rem')};
  width: 100%;

  &:focus {
    border-color: ${(props): string | null => (props.isErrored ? '#c12915' : null)};
    box-shadow: ${(props): string | null => (props.isErrored ? '0px 0px 10px #c12915' : null)};
  }
`;

const StyledInputError = styled.div`
  color: #c12915;
  font-size: 1.3rem;
  margin: 1rem 0;
`;

const FormInput: React.FunctionComponent<FormInputProps> = (
  props: FormInputProps
): ReactElement<HTMLInputElement> => {
  return (
    <>
      <StyledInput
        aria-describedby={props.errorMessage && `error-message-label-${props.id}`}
        aria-label={props.ariaLabel}
        autoComplete="off"
        defaultValue={props.defaultValue}
        hasNoSpacing={props.hasNoSpacing}
        id={props.id}
        isErrored={props.errorMessage ? true : undefined}
        name={props.name}
        onChange={props.onChange}
        onInput={props.onInput}
        placeholder={props.placeholder}
        style={props.style}
        type="text"
        value={props.value}
      />
      {props.errorMessage && (
        <StyledInputError id={`error-message-label-${props.id}`}>
          {props.errorMessage}
        </StyledInputError>
      )}
    </>
  );
};

export default FormInput;
