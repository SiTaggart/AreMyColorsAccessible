import React, { ReactElement, memo } from 'react';
import Color from 'color';
import { HSLSliders } from './styled';
import HSLSlider from '../hsl-slider';

interface HSLColorTypes extends Color {
  color: number[];
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
    saturation: Math.round(saturation),
    lightness: Math.round(lightness),
  };
};

interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
}
const convertToHSL = (hex: string): HSLColor => {
  const hsl: Partial<HSLColorTypes> = Color(hex).hsl();
  return roundHSLValues(hsl);
};

interface HslSliderProps {
  id: string;
  onChange: (hex: string, id: string) => void;
  value: string;
  variant?: 'compact' | null;
}

interface Range {
  label: string;
  min: number;
  max: number;
  value: number;
  handleOnChange: (args: React.ChangeEvent<HTMLInputElement>) => void;
  symbol: string;
}
const HslSliders: React.FC<HslSliderProps> = ({
  id,
  onChange,
  value,
  variant,
}: HslSliderProps): ReactElement => {
  const hslColorValue: HSLColor = convertToHSL(value);

  const updateColor = (color: HSLColor): void => {
    const hex = Color({
      h: color.hue,
      s: color.saturation,
      l: color.lightness,
    }).hex();
    onChange(hex, id);
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newHsl: HSLColor = {
      ...convertToHSL(value),
      hue: parseInt(e.target.value),
    };
    updateColor(newHsl);
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newHsl: HSLColor = {
      ...convertToHSL(value),
      saturation: parseInt(e.target.value, 10),
    };
    updateColor(newHsl);
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newHsl: HSLColor = {
      ...convertToHSL(value),
      lightness: parseInt(e.target.value, 10),
    };
    updateColor(newHsl);
  };

  const hslRanges: Range[] = [
    {
      label: 'Hue',
      min: 0,
      max: 360,
      value: hslColorValue.hue,
      handleOnChange: handleHueChange,
      symbol: '°',
    },
    {
      label: 'Saturation',
      min: 0,
      max: 100,
      value: hslColorValue.saturation,
      handleOnChange: handleSaturationChange,
      symbol: '%',
    },
    {
      label: 'Lightness',
      min: 0,
      max: 100,
      value: hslColorValue.lightness,
      handleOnChange: handleLightnessChange,
      symbol: '%',
    },
  ];

  return (
    <HSLSliders data-test="form-hsl-sliders" variant={variant}>
      {hslRanges.map(
        (range): ReactElement => (
          <HSLSlider
            key={`${id}-${range.label}`}
            id={`${id}-${range.label}`}
            label={range.label}
            max={range.max}
            min={range.min}
            onChange={range.handleOnChange}
            onInput={range.handleOnChange}
            symbol={range.symbol}
            value={range.value}
            variant={variant}
          />
        )
      )}
    </HSLSliders>
  );
};

export default memo(HslSliders);
