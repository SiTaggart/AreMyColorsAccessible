import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Palette: React.SFC<Props> = props => {
  return (
    <div>
      <h1>This is a palette</h1>
      {props.children}
    </div>
  );
};

export default Palette;
