import * as React from 'react';
import styled from '@emotion/styled';

const Styled{{pascalCase name}} = styled.div<{}>``;

interface {{pascalCase name}}Props {
  children?: React.ReactElement;
}

const {{pascalCase name}}: React.FC<{{pascalCase name}}Props> = (props: {{pascalCase name}}Props): React.ReactElement => {
  return (
    <Styled{{pascalCase name}}>
      {props.children}
    </Styled{{pascalCase name}}>
  );
};

export { {{pascalCase name}} };
