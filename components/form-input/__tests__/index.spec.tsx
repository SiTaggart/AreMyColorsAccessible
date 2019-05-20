/* eslint-env jest */

import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import FormInput, { FormInputProps } from '..';

type FormInputWrapperProps = Partial<FormInputProps>;

describe('FormInput', (): void => {
  const FormInputWrapper: React.FunctionComponent<FormInputWrapperProps> = (
    props: FormInputWrapperProps
  ): ReactElement<HTMLDivElement> => <FormInput id="form-id" {...props} />;

  it('renders without crashing', (): void => {
    ReactDOM.render(<FormInputWrapper />, document.createElement('div'));
    const formInputCmp = renderer.create(<FormInputWrapper />).toJSON();
    expect(formInputCmp).toMatchSnapshot();
  });

  it('should set aria-label on the input when past', (): void => {
    const wrapper: ReactWrapper = mount(<FormInputWrapper ariaLabel="mock aria label" />);
    expect(wrapper.find('input').prop('aria-label')).toBe('mock aria label');
  });

  it('should set a default value', (): void => {
    const wrapper: ReactWrapper = mount(<FormInputWrapper defaultValue="testing" />);
    expect(wrapper.find('input').prop('defaultValue')).toEqual('testing');
  });

  it('should display an error message and associate it to the input', (): void => {
    const wrapper: ReactWrapper = mount(<FormInputWrapper errorMessage="this is an error" />);
    expect(wrapper.find('input').prop('aria-describedby')).toEqual('error-message-label-form-id');
    expect(wrapper.find('error-message-label-form-id').length).toBeGreaterThan(-1);
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
    const wrapper: ReactWrapper = mount(<FormInputWrapper name="testing" />);
    expect(wrapper.find('input').prop('name')).toEqual('testing');
  });

  it('should call a passed in onChange method, onChange', (): void => {
    const onChangeMock: jest.Mock = jest.fn();
    const wrapper: ReactWrapper = mount(<FormInputWrapper onChange={onChangeMock} />);
    wrapper.simulate('change');
    expect(onChangeMock).toBeCalled();
  });

  it('should call a passed in onInput method, onInput', (): void => {
    const onInputMock: jest.Mock = jest.fn();
    const wrapper: ReactWrapper = mount(<FormInputWrapper onInput={onInputMock} />);
    wrapper.simulate('input');
    expect(onInputMock).toBeCalled();
  });

  it('should set a style attribute on the input when passed style', (): void => {
    const wrapper: ReactWrapper = mount(<FormInputWrapper style={{ background: 'red' }} />);
    expect(wrapper.find('input').prop('style')).toEqual({ background: 'red' });
  });

  it('should set the value of the input when passed a value', (): void => {
    const onChangeMock: jest.Mock = jest.fn();
    const wrapper: ReactWrapper = mount(
      <FormInputWrapper onChange={onChangeMock} value="testing" />
    );
    expect(wrapper.find('input').prop('value')).toEqual('testing');
  });
});
