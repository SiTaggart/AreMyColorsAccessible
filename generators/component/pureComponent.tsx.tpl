import React, { PureComponent, ReactNode } from 'react';
import './{{kebabCase name}}.scss';

interface I{{pascalCase name}}Props {
  children: ReactNode;
}

interface I{{pascalCase name}}State {}

export default class {{pascalCase name}} extends PureComponent<I{{pascalCase name}}Props, I{{pascalCase name}}State> {
  state = {}

  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="{{camelCase name}}">{this.props.children}</div>;
  }
}
