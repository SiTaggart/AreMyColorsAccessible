import React, { ReactNode, ReactElement } from 'react';
import './form.scss';

interface FormProps {
  children: ReactNode;
  style?: {};
}

const Form: React.FunctionComponent<FormProps> = (
  props: FormProps
): ReactElement<HTMLDivElement> => {
  return (
    <div className="form" style={props.style}>
      {props.children}
    </div>
  );
};

export default Form;
