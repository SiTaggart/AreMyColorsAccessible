import React, { Component, ReactElement } from 'react';
import styled from '@emotion/styled';
import { breakpoint } from '../../../styles/utils';

interface ContainerProps {
  children?: JSX.Element[] | JSX.Element;
  variant?: 'home' | 'about' | 'palette';
}

const StyledContainer = styled.main<ContainerProps>`
  color: ${(props): string | null => (props.variant === 'palette' ? '#343334' : null)};
  padding-top: ${(props): string | null => (props.variant === 'about' ? '3rem' : null)};
  position: relative;

  ${breakpoint('small')} {
    min-height: ${(props): string | null => (props.variant === 'home' ? '85%' : null)};
  }
`;

class Container extends Component<ContainerProps, {}> {
  public render(): ReactElement<HTMLMainElement> {
    return <StyledContainer {...this.props}>{this.props.children}</StyledContainer>;
  }
}
export default Container;
