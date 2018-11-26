import React, { ReactNode } from 'react';
import './index.scss';

interface IFormProps {
  children: ReactNode;
  style: {};
}

const Form: React.FunctionComponent<IFormProps> = (props: IFormProps) => {
  return (
    <div className="form" style={props.style}>
      {props.children}
    </div>
  );
};

export default Form;
