import React, { ReactNode } from 'react';
import './index.scss';

interface I{{pascalCase name}}Props {
  children: ReactNode;
}

const {{pascalCase name}}: React.FunctionComponent<I{{pascalCase name}}Props> = (props: I{{pascalCase name}}Props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

export default {{pascalCase name}};
