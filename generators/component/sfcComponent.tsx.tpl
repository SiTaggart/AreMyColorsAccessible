import React, { ReactNode } from 'react';
import './{{kebabCase name}}.scss';

interface {{pascalCase name}}Props {
  children: ReactNode;
}

const {{pascalCase name}}: React.FunctionComponent<{{pascalCase name}}Props> = (props: {{pascalCase name}}Props) => {
  return (
    <div className="{{camelCase name}}">
      {props.children}
    </div>
  );
};

export default {{pascalCase name}};
