import React, { ReactNode } from 'react';
import cx from 'classnames';
import './form-label.scss';

interface IFormLabelProps {
  children: ReactNode;
  htmlFor: string;
  isLarge?: boolean;
}

const FormLabel: React.FunctionComponent<IFormLabelProps> = (props: IFormLabelProps) => {
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
