import React, { ReactElement } from 'react';
import styled from '@emotion/styled';
import { breakpoint } from '../../../styles/utils';

interface ContainerProps {
  children?: JSX.Element[] | JSX.Element;
  variant?: 'home' | 'about' | 'palette';
}

const StyledContainer = styled.main<ContainerProps>`
  color: ${(props): string | undefined => (props.variant === 'palette' ? '#343334' : undefined)};
  padding-top: ${(props): string | undefined => (props.variant === 'about' ? '3rem' : undefined)};
  position: relative;

  ${breakpoint('small')} {
    min-height: ${(props): string | undefined => (props.variant === 'home' ? '85%' : undefined)};
  }
`;

const Container: React.FC<ContainerProps> = ({
  variant,
  children,
}: ContainerProps): ReactElement => <StyledContainer variant={variant}>{children}</StyledContainer>;

export { Container };
