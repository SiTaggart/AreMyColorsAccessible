import styled from '@emotion/styled';
import { breakpoint } from '../../styles/utils';

interface HSLSLiderCommonProps {
  variant?: 'compact' | undefined | undefined;
}

export const HSLSliders = styled.div<HSLSLiderCommonProps>`
  display: ${(props): string | undefined => (props.variant === 'compact' ? undefined : 'flex')};
  flex-wrap: ${(props): string | undefined => (props.variant === 'compact' ? undefined : 'wrap')};

  ${breakpoint('medium')} {
    margin: ${(props): string | undefined =>
      props.variant === 'compact' ? undefined : '0 -0.5rem'};
  }
`;
