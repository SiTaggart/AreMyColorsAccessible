import Color from 'color';
import React, { ReactElement, memo } from 'react';

import { HSLSlider } from '../hsl-slider';
import { HSLSliders } from './styled';

interface HSLColorTypes extends Color {
  color: Array<number>;
}
const roundHSLValues = ({ color }: Partial<HSLColorTypes>): HSLColor => {
  let hue = 0;
  let saturation = 0;
  let lightness = 0;
  if (color) {
    [hue, saturation, lightness] = color;
  }
  return {
    hue: Math.round(hue),
    lightness: Math.round(lightness),
    saturation: Math.round(saturation),
  };
};

interface HSLColor {
  hue: number;
  lightness: number;
  saturation: number;
}
const convertToHSL = (hex: string): HSLColor => {
  const hsl: Partial<HSLColorTypes> = Color(hex).hsl();
  return roundHSLValues(hsl);
};

interface HslSliderProps {
  id: string;
  onChange: (hex: string, id: string) => void;
  value: string;
  variant?: 'compact' | undefined;
}

interface Range {
  handleOnChange: (args: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  max: number;
  min: number;
  symbol: string;
  value: number;
}
const HslSliders: React.FC<HslSliderProps> = memo(
  ({ id, onChange, value, variant }: HslSliderProps): ReactElement => {
    const hslColorValue: HSLColor = convertToHSL(value);

    const updateColor = (color: HSLColor): void => {
      const hex = Color({
        h: color.hue,
        l: color.lightness,
        s: color.saturation,
      }).hex();
      onChange(hex, id);
    };

    const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newHsl: HSLColor = {
        ...convertToHSL(value),
        hue: Number.parseInt(e.target.value, 10),
      };
      updateColor(newHsl);
    };

    const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newHsl: HSLColor = {
        ...convertToHSL(value),
        saturation: Number.parseInt(e.target.value, 10),
      };
      updateColor(newHsl);
    };

    const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const newHsl: HSLColor = {
        ...convertToHSL(value),
        lightness: Number.parseInt(e.target.value, 10),
      };
      updateColor(newHsl);
    };

    const hslRanges: Array<Range> = [
      {
        handleOnChange: handleHueChange,
        label: 'Hue',
        max: 360,
        min: 0,
        symbol: '°',
        value: hslColorValue.hue,
      },
      {
        handleOnChange: handleSaturationChange,
        label: 'Saturation',
        max: 100,
        min: 0,
        symbol: '%',
        value: hslColorValue.saturation,
      },
      {
        handleOnChange: handleLightnessChange,
        label: 'Lightness',
        max: 100,
        min: 0,
        symbol: '%',
        value: hslColorValue.lightness,
      },
    ];

    return (
      <HSLSliders data-testid="form-hsl-sliders" variant={variant}>
        {hslRanges.map(
          (range): ReactElement => (
            <HSLSlider
              data-testid={`${id}-${range.label}`}
              id={`${id}-${range.label}`}
              key={`${id}-${range.label}`}
              label={range.label}
              max={range.max}
              min={range.min}
              onChange={range.handleOnChange}
              onInput={range.handleOnChange}
              symbol={range.symbol}
              value={range.value}
              variant={variant}
            />
          ),
        )}
      </HSLSliders>
    );
  },
);
HslSliders.displayName = 'HslSliders';
export { HslSliders };
