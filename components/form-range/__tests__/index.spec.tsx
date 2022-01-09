/* eslint-env jest */
/// <reference types="jest" />

import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { FormRange, FormRangeProps } from '..';

type IFormRangeWrapperProps = Partial<FormRangeProps>;

describe('FormRange', (): void => {
  const FormRangeWrapper: React.FunctionComponent<IFormRangeWrapperProps> = (
    props: IFormRangeWrapperProps
  ): ReactElement<HTMLInputElement> => <FormRange id="range-id" max={100} min={1} {...props} />;

  it('renders without crashing', (): void => {
    ReactDOM.render(<FormRangeWrapper />, document.createElement('div'));
    const formRangeCmp = renderer.create(<FormRangeWrapper />).toJSON();
    expect(formRangeCmp).toMatchSnapshot();
  });

  it('should set a default value', (): void => {
    const { getByTestId } = render(
      <FormRangeWrapper defaultValue="testing" id="default-value-test" />
    );
    expect(getByTestId('default-value-test').getAttribute('value')).toEqual('testing');
  });

  it('should call a passed in onChange method, onChange', (): void => {
    const onChangeMock: jest.Mock = jest.fn();
    const { getByTestId } = render(<FormRangeWrapper id="onchange-test" onChange={onChangeMock} />);
    fireEvent.change(getByTestId('onchange-test'), { target: { value: 23 } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('should call a passed in onInput method, onInput', (): void => {
    const onInputMock: jest.Mock = jest.fn();
    const { getByTestId } = render(<FormRangeWrapper id="oninput-test" onInput={onInputMock} />);
    fireEvent.input(getByTestId('oninput-test'), { target: { value: 12 } });
    expect(onInputMock).toHaveBeenCalled();
  });

  it('should set the value of the input when passed a value', (): void => {
    const onChangeMock: jest.Mock = jest.fn();
    const { getByTestId } = render(
      <FormRangeWrapper id="value-test" onChange={onChangeMock} value={3} />
    );
    expect(getByTestId('value-test').getAttribute('value')).toEqual('3');
  });
});
