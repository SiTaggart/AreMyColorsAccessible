import React, { ReactNode } from 'react';
import './form-label.scss';

interface IFormLabelProps {
  children: ReactNode;
  htmlFor: string;
}

const FormLabel: React.FunctionComponent<IFormLabelProps> = (props: IFormLabelProps) => {
  return (
    <label className="form-label" htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
};

export default FormLabel;
