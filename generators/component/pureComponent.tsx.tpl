import React, { PureComponent, ReactNode } from 'react';
import './{{kebabCase name}}.scss';

interface I{{pascalCase name}}Props {
  children: ReactNode;
}

interface {{pascalCase name}}State {}

export default class {{pascalCase name}} extends PureComponent<{{pascalCase name}}Props, I{{pascalCase name}}State> {
  state = {}

  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="{{camelCase name}}">{this.props.children}</div>;
  }
}
