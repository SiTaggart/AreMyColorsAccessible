import React, { ReactNode, ReactElement } from 'react';
import './form-control.scss';

interface FormControlProps {
  children: ReactNode;
}

const FormControl: React.FunctionComponent<FormControlProps> = (
  props: FormControlProps
): ReactElement<HTMLDivElement> => {
  return <div className="form-control">{props.children}</div>;
};

export default FormControl;
