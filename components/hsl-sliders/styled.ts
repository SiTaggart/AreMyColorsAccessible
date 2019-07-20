import styled from '@emotion/styled';
import { breakpoint } from '../../styles/utils';

interface HSLSLiderCommonProps {
  variant?: 'compact' | null | undefined;
}

export const HSLSliders = styled.div<HSLSLiderCommonProps>`
  display: ${(props): string | null => (props.variant !== 'compact' ? 'flex' : null)};
  flex-wrap: ${(props): string | null => (props.variant !== 'compact' ? 'wrap' : null)};

  ${breakpoint('medium')} {
    margin: ${(props): string | null => (props.variant !== 'compact' ? '0 -0.5rem' : null)};
  }
`;
