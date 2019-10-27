import css, { SerializedStyles } from '@emotion/css';
import { lighten } from 'polished';
import styled from '@emotion/styled';

const trackColor = 'currentColor';
const thumbColor = 'currentColor';

const thumbRadius = '2px';
const thumbHeight = '20px';
const thumbWidth = '8px';
const thumbShadowSize = '1px';
const thumbShadowBlur = '1px';
const thumbShadowColor = '#999';
const thumbBorderWidth = '1px';
const thumbBorderColor = 'currentColor';

const trackWidth = '100%';
const trackHeight = '4px';
const trackShadowSize = '0';
const trackShadowBlur = '0';
const trackShadowColor = '#fff';
const trackBorderWidth = '1px';
const trackBorderColor = 'currentColor';

const trackRadius = '5px';

const shadow = (
  shadowSize: string,
  shadowBlur: string,
  shadowColor: string
): SerializedStyles => css`
  box-shadow: ${shadowSize} ${shadowSize} ${shadowBlur} ${shadowColor},
    0 0 ${shadowSize} ${lighten(0.05, shadowColor)};
`;

const track = (): SerializedStyles => css`
  width: ${trackWidth};
  height: ${trackHeight};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const thumb = (): SerializedStyles => css`
  ${shadow(thumbShadowSize, thumbShadowBlur, thumbShadowColor)};
  border: ${thumbBorderWidth} solid ${thumbBorderColor};
  height: ${thumbHeight};
  width: ${thumbWidth};
  border-radius: ${thumbRadius};
  background: ${thumbColor};
  cursor: pointer;
`;

export const StyledRange = styled.input`
  -webkit-appearance: none;
  background: transparent;
  border-radius: ${thumbRadius};
  color: ${thumbColor};
  display: block;
  margin: ${parseInt(thumbHeight.replace('px', ''), 10) / 2}px 0;
  width: ${trackWidth};

  &::-webkit-slider-runnable-track {
    ${track};
    ${shadow(trackShadowSize, trackShadowBlur, trackShadowColor)};
    background: ${trackColor};
    border: ${trackBorderWidth} solid ${trackBorderColor};
    border-radius: ${trackRadius};
  }

  &::-webkit-slider-thumb {
    ${thumb};
    -webkit-appearance: none;
    margin-top: ${(-parseInt(trackBorderWidth.replace('px', ''), 10) * 2 +
      parseInt(trackHeight.replace('px', ''), 10)) /
      2 -
      parseInt(thumbHeight.replace('px', ''), 10) / 2}px;
  }

  &:focus::-webkit-slider-runnable-track {
    background: ${trackColor};
  }

  &::-moz-range-track {
    ${track};
    ${shadow(trackShadowSize, trackShadowBlur, trackShadowColor)};
    background: ${trackColor};
    border: ${trackBorderWidth} solid ${trackBorderColor};
    border-radius: ${trackRadius};
  }

  &::-moz-range-thumb {
    ${thumb};
  }

  &::-ms-track {
    ${track};
    background: transparent;
    border-color: transparent;
    border-width: ${thumbWidth} 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    ${shadow(trackShadowSize, trackShadowBlur, trackShadowColor)};
    background: ${trackColor};
    border: ${trackBorderWidth} solid ${trackBorderColor};
    border-radius: ${trackRadius} * 2;
  }

  &::-ms-fill-upper {
    ${shadow(trackShadowSize, trackShadowBlur, trackShadowColor)};
    background: ${trackColor};
    border: ${trackBorderWidth} solid ${trackBorderColor};
    border-radius: ${trackRadius} * 2;
  }

  &::-ms-thumb {
    ${thumb};
  }

  &:focus::-ms-fill-lower {
    background: ${trackColor};
  }

  &:focus::-ms-fill-upper {
    background: ${trackColor};
  }
`;

StyledRange.defaultProps = {
  type: 'range',
};
