import React, { Component, ReactNode } from 'react';
import './index.scss';

interface I{{pascalCase name}}Props {
  children: ReactNode;
}

interface I{{pascalCase name}}State {}

export default class {{pascalCase name}} extends Component<I{{pascalCase name}}Props, I{{pascalCase name}}State> {
  state = {}

  constructor(props: any) {
    super(props);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
