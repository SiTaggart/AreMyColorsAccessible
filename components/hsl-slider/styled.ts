import { css, SerializedStyles } from '@emotion/core';
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

export const HSLSlider = styled.div<HSLSLiderCommonProps>`
  display: ${(props): string | null => (props.variant === 'compact' ? 'flex' : null)};
  padding: ${(props): string | null => (props.variant === 'compact' ? '0' : null)};
  width: 100%;

  ${breakpoint('medium')} {
    flex: 1 0 auto;
    padding: ${(props): string | null => (props.variant !== 'compact' ? '0 0.5rem' : null)};
    width: ${(props): string | null => (props.variant !== 'compact' ? '33.3333%' : null)};
  }
`;

const variantCompact = (props: HSLSLiderCommonProps): SerializedStyles => {
  if (props.variant === 'compact') {
    return css`
      align-items: center;
      display: inline-flex;
      flex: 1;
      text-align: left;
    `;
  } else {
    return css``;
  }
};
export const HSLSliderLabelContainer = styled.div<HSLSLiderCommonProps>`
  ${variantCompact}
`;

export const HSLSliderRangeContainer = styled.div<HSLSLiderCommonProps>`
  flex: ${(props): string | null => (props.variant === 'compact' ? '6' : null)};
`;
