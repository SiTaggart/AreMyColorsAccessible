import React, { ReactNode, ReactElement } from 'react';
import cx from 'classnames';
import './form-label.scss';

interface FormLabelProps {
  children: ReactNode;
  htmlFor: string;
  isLarge?: boolean;
}

const FormLabel: React.FunctionComponent<FormLabelProps> = (
  props: FormLabelProps
): ReactElement<HTMLLabelElement> => {
  return (
    <label
      className={cx('form-label', { 'form-label--large': props.isLarge })}
      htmlFor={props.htmlFor}
    >
      {props.children}
    </label>
  );
};

export default FormLabel;
