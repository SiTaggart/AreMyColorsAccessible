import React, { Component, ReactNode, ReactElement } from 'react';
import Color from 'color';
import FormLabel from '../form-label';
import FormRange from '../form-range';
import { HSLSliders, HSLSlider, HSLSliderLabelContainer, HSLSliderRangeContainer } from './styled';

interface HslSliderProps {
  id: string;
  onChange: (hex: string, id: string) => void;
  value: string;
  variant?: 'compact' | null;
}

interface HSLColor {
  hue: number;
  saturation: number;
  lightness: number;
}

interface Range {
  label: string;
  min: number;
  max: number;
  value: number;
  handleOnChange: (args: React.ChangeEvent<HTMLInputElement>) => void;
  symbol: string;
}

interface HSLColorTypes extends Color {
  color: number[];
}

class HslSlider extends Component<HslSliderProps, {}> {
  public shouldComponentUpdate = (nextProps: HslSliderProps): boolean => {
    return this.props.value !== nextProps.value;
  };

  private convertToHSL = (hex: string): HSLColor => {
    let hsl: Partial<HSLColorTypes> = Color(hex).hsl();
    return this.roundHSLValues(hsl);
  };

  private handleHueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newHsl: HSLColor = {
      ...this.convertToHSL(this.props.value),
      hue: parseInt(e.target.value)
    };
    this.updateColor(newHsl);
  };

  private handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newHsl: HSLColor = {
      ...this.convertToHSL(this.props.value),
      saturation: parseInt(e.target.value)
    };
    this.updateColor(newHsl);
  };

  private handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newHsl: HSLColor = {
      ...this.convertToHSL(this.props.value),
      lightness: parseInt(e.target.value)
    };
    this.updateColor(newHsl);
  };

  private renderRangeInput = (range: Range): ReactNode => {
    const id = this.props.id + '-' + range.label;
    return (
      <HSLSlider key={id} variant={this.props.variant}>
        <HSLSliderLabelContainer variant={this.props.variant}>
          <FormLabel htmlFor={id} variant={this.props.variant}>
            {this.props.variant === 'compact'
              ? `${range.label.substring(0, 1)}`
              : `${range.label} ${range.value + range.symbol}`}
          </FormLabel>
        </HSLSliderLabelContainer>
        <HSLSliderRangeContainer variant={this.props.variant}>
          <FormRange
            id={id}
            max={range.max}
            min={range.min}
            onChange={(e): void => range.handleOnChange(e)}
            onInput={(e): void => range.handleOnChange(e)}
            value={range.value}
          />
        </HSLSliderRangeContainer>
      </HSLSlider>
    );
  };

  private roundHSLValues = (hsl: Partial<HSLColorTypes>): HSLColor => {
    let hue = 0;
    let saturation = 0;
    let lightness = 0;
    if (hsl.color) {
      hue = hsl.color[0];
      saturation = hsl.color[1];
      lightness = hsl.color[2];
    }
    return {
      hue: Math.round(hue),
      saturation: Math.round(saturation),
      lightness: Math.round(lightness)
    };
  };

  private updateColor = (color: HSLColor): void => {
    const hex = Color({
      h: color.hue,
      s: color.saturation,
      l: color.lightness
    }).hex();
    this.props.onChange(hex, this.props.id);
  };

  public render(): ReactElement<HTMLDivElement> {
    const hslColorValue: HSLColor = this.convertToHSL(this.props.value);

    const hslRanges: Range[] = [
      {
        label: 'Hue',
        min: 0,
        max: 360,
        value: hslColorValue.hue,
        handleOnChange: this.handleHueChange,
        symbol: '°'
      },
      {
        label: 'Saturation',
        min: 0,
        max: 100,
        value: hslColorValue.saturation,
        handleOnChange: this.handleSaturationChange,
        symbol: '%'
      },
      {
        label: 'Lightness',
        min: 0,
        max: 100,
        value: hslColorValue.lightness,
        handleOnChange: this.handleLightnessChange,
        symbol: '%'
      }
    ];

    return (
      <HSLSliders data-test="form-hsl-sliders" variant={this.props.variant}>
        {hslRanges.map(this.renderRangeInput)}
      </HSLSliders>
    );
  }
}

export default HslSlider;
