import React, { Component, ReactNode } from 'react';
import './{{kebabCase name}}.scss';

interface {{pascalCase name}}Props {
  children: ReactNode;
}

interface {{pascalCase name}}State {}

export default class {{pascalCase name}} extends Component<{{pascalCase name}}Props, {{pascalCase name}}State> {
  state = {}

  constructor(props: any) {
    super(props);
  }

  render() {
    return <div className="{{camelCase name}}">{this.props.children}</div>;
  }
}
