import React, { ReactNode } from 'react';
import './index.scss';

interface ILayoutFullProps {
  children: ReactNode;
}

const LayoutFull: React.FunctionComponent<ILayoutFullProps> = (props: ILayoutFullProps) => {
  return <div className="layout--full">{props.children}</div>;
};

export default LayoutFull;
