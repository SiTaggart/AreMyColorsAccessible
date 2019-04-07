/* eslint-env jest */

import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import FormRange, { FormRangeProps } from '..';

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
    const wrapper: ReactWrapper = mount(<FormRangeWrapper defaultValue="testing" />);
    expect(wrapper.find('input').prop('defaultValue')).toEqual('testing');
  });

  it('should call a passed in onChange method, onChange', (): void => {
    const onChangeMock: jest.Mock = jest.fn();
    const wrapper: ReactWrapper = mount(<FormRangeWrapper onChange={onChangeMock} />);
    wrapper.simulate('change');
    expect(onChangeMock).toBeCalled();
  });

  it('should call a passed in onInput method, onInput', (): void => {
    const onInputMock: jest.Mock = jest.fn();
    const wrapper: ReactWrapper = mount(<FormRangeWrapper onInput={onInputMock} />);
    wrapper.simulate('input');
    expect(onInputMock).toBeCalled();
  });

  it('should set the value of the input when passed a value', (): void => {
    const onChangeMock: jest.Mock = jest.fn();
    const wrapper: ReactWrapper = mount(<FormRangeWrapper onChange={onChangeMock} value={20} />);
    expect(wrapper.find('input').prop('value')).toEqual(20);
  });
});
