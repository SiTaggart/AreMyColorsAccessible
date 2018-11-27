import React, { ReactNode } from 'react';
import './{{kebabCase name}}.scss';

interface I{{pascalCase name}}Props {
  children: ReactNode;
}

const {{pascalCase name}}: React.FunctionComponent<I{{pascalCase name}}Props> = (props: I{{pascalCase name}}Props) => {
  return (
    <div className="{{camelCase name}}">
      {props.children}
    </div>
  );
};

export default {{pascalCase name}};
