import React, { ReactNode } from 'react';
import './form-control.scss';

interface IFormControlProps {
  children: ReactNode;
}

const FormControl: React.FunctionComponent<IFormControlProps> = (props: IFormControlProps) => {
  return <div className="form-control">{props.children}</div>;
};

export default FormControl;
