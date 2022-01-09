/* eslint-env jest */
/// <reference types="jest" />

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { FormInput, FormInputProps } from '..';

type FormInputWrapperProps = Partial<FormInputProps>;

describe('FormInput', (): void => {
  const FormInputWrapper: React.FC<FormInputWrapperProps> = (props: FormInputWrapperProps) => (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <FormInput id="form-id" {...props} />
  );

  it('renders without crashing', (): void => {
    ReactDOM.render(<FormInputWrapper />, document.createElement('div'));
    const formInputCmp = renderer.create(<FormInputWrapper />).toJSON();
    expect(formInputCmp).toMatchSnapshot();
  });

  it('should set aria-label on the input when past', (): void => {
    const { getByLabelText } = render(<FormInputWrapper ariaLabel="mock aria label" />);
    expect(getByLabelText('mock aria label')).not.toBeNull();
  });

  it('should set a default value', (): void => {
    const { getByDisplayValue } = render(<FormInputWrapper defaultValue="testing" />);
    expect(getByDisplayValue('testing')).not.toBeNull();
  });

  it('should display an error message and associate it to the input', (): void => {
    const { getByText, getByLabelText } = render(
      <FormInputWrapper ariaLabel="error input" errorMessage="this is an error" />
    );
    expect(getByLabelText('error input').getAttribute('aria-describedby')).toEqual(
      'error-message-label-form-id'
    );
    expect(getByText('this is an error')).not.toBeNull();
    const formInputCmp = renderer
      .create(<FormInputWrapper errorMessage="this is an error" />)
      .toJSON();
    expect(formInputCmp).toMatchSnapshot();
  });

  it('should set the noSpacing class when hasNoSpacing is set', (): void => {
    const formInputCmp = renderer.create(<FormInputWrapper hasNoSpacing />).toJSON();
    expect(formInputCmp).toMatchSnapshot();
  });

  it('should set a name', (): void => {
    const { getByTestId } = render(<FormInputWrapper id="name-test" name="testing" />);
    expect(getByTestId('name-test').getAttribute('name')).toEqual('testing');
  });

  it('should call a passed in onChange method, onChange', (): void => {
    const onChangeMock: jest.Mock = jest.fn();
    const { getByTestId } = render(<FormInputWrapper id="change-test" onChange={onChangeMock} />);
    fireEvent.change(getByTestId('change-test'), { target: { value: '#ccc' } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should call a passed in onInput method, onInput', (): void => {
    const onInputMock: jest.Mock = jest.fn();
    const { getByTestId } = render(<FormInputWrapper id="input-test" onInput={onInputMock} />);
    fireEvent.input(getByTestId('input-test'), { target: { value: '#ccc' } });
    expect(onInputMock).toHaveBeenCalled();
  });

  it('should set a style attribute on the input when passed style', (): void => {
    const { getByTestId } = render(
      <FormInputWrapper id="style-test" style={{ background: 'red' }} />
    );
    expect(getByTestId('style-test').getAttribute('style')).toEqual('background: red;');
  });

  it('should set the value of the input when passed a value', (): void => {
    const onChangeMock: jest.Mock = jest.fn();
    const { getByTestId } = render(
      <FormInputWrapper id="value-test" onChange={onChangeMock} value="testing" />
    );
    expect(getByTestId('value-test').getAttribute('value')).toEqual('testing');
  });
});
