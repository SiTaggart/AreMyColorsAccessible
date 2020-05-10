import { css, SerializedStyles } from '@emotion/core';
import styled from '@emotion/styled';
import { breakpoint } from '../../styles/utils';

interface HSLSLiderCommonProps {
  variant?: 'compact' | undefined | undefined;
}

export const StyledHSLSlider = styled.div<HSLSLiderCommonProps>`
  display: ${(props): string | undefined => (props.variant === 'compact' ? 'flex' : undefined)};
  padding: ${(props): string | undefined => (props.variant === 'compact' ? '0' : undefined)};
  width: 100%;

  ${breakpoint('medium')} {
    flex: 1 0 auto;
    padding: ${(props): string | undefined =>
      props.variant !== 'compact' ? '0 0.5rem' : undefined};
    width: ${(props): string | undefined => (props.variant !== 'compact' ? '33.3333%' : undefined)};
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
  }
  return css``;
};
export const HSLSliderLabelContainer = styled.div<HSLSLiderCommonProps>`
  ${variantCompact}
`;

export const HSLSliderRangeContainer = styled.div<HSLSLiderCommonProps>`
  flex: ${(props): string | undefined => (props.variant === 'compact' ? '6' : undefined)};
`;
