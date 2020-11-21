import React, { ReactElement } from 'react';
import styled, { CSSObject } from '@emotion/styled';

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
  style?: React.CSSProperties;
  value?: string;
  className?: string;
  css?: CSSObject;
}

interface StyledInputProps {
  isErrored?: boolean;
  hasNoSpacing?: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  background: rgba(255, 255, 255, 0.1);
  border: solid 1px;
  border-color: ${(props): string | undefined => (props.isErrored ? '#c12915' : undefined)};
  border-radius: 3px;
  color: ${(props): string | undefined => (props.isErrored ? '#c12915' : undefined)};
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  margin-bottom: ${(props): string => (props.hasNoSpacing ? '0' : '2rem')};
  width: 100%;

  &:focus {
    border-color: ${(props): string | undefined => (props.isErrored ? '#c12915' : undefined)};
    box-shadow: ${(props): string | undefined =>
      props.isErrored ? '0px 0px 10px #c12915' : undefined};
  }
`;

const StyledInputError = styled.div`
  color: #c12915;
  font-size: 1.3rem;
  margin: 1rem 0;
`;

const FormInput: React.FC<FormInputProps> = ({
  id,
  ariaLabel,
  defaultValue,
  hasNoSpacing,
  name,
  onChange,
  onInput,
  placeholder,
  style,
  value,
  errorMessage,
  className,
}: FormInputProps): ReactElement<HTMLInputElement> => (
  <>
    <StyledInput
      aria-describedby={errorMessage && `error-message-label-${id}`}
      aria-label={ariaLabel}
      autoComplete="off"
      className={className}
      data-testid={id}
      defaultValue={defaultValue}
      hasNoSpacing={hasNoSpacing}
      id={id}
      isErrored={errorMessage ? true : undefined}
      name={name}
      onChange={onChange}
      onInput={onInput}
      placeholder={placeholder}
      style={style}
      type="text"
      value={value}
    />
    {errorMessage && (
      <StyledInputError id={`error-message-label-${id}`}>{errorMessage}</StyledInputError>
    )}
  </>
);

export { FormInput };
