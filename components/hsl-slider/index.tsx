import React, { Component, ReactNode } from 'react';
import Color from 'color';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import './hsl-slider.scss';
import FormLabel from '../form-label';
import FormRange from '../form-range';

interface HslSliderProps {
  id: string;
  onChange: (hex: string, id: string) => void;
  value: string;
  variant?: 'compact' | null;
}

interface HslSliderState {
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
  color: Array<number>;
}

class HslSlider extends Component<HslSliderProps, HslSliderState> {
  constructor(props: HslSliderProps) {
    super(props);
    const hsl: Partial<HSLColorTypes> = Color(this.props.value).hsl();
    this.state = this.roundHSLValues(hsl);
    this.updateColor = this.updateColor.bind(this);
  }

  shouldComponentUpdate(_nextProps: HslSliderProps, nextState: HslSliderState): boolean {
    return !isEqual(this.state, nextState);
  }

  private handleHueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState(
      {
        hue: parseInt(e.target.value)
      },
      debounce(this.updateColor, 200)
    );
  };

  private handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState(
      {
        saturation: parseInt(e.target.value)
      },
      debounce(this.updateColor, 200)
    );
  };

  private handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState(
      {
        lightness: parseInt(e.target.value)
      },
      debounce(this.updateColor, 200)
    );
  };

  private renderRangeInput = (range: Range): ReactNode => {
    const id = this.props.id + '-' + range.label;
    return (
      <div
        className={classNames('form-hsl-slider', {
          'form-hsl-slider--compact': this.props.variant === 'compact'
        })}
        key={id}
      >
        <FormLabel htmlFor={id}>
          {this.props.variant === 'compact'
            ? `${range.label.substring(0, 1)}`
            : `${range.label} ${range.value + range.symbol}`}
        </FormLabel>
        <FormRange
          defaultValue={range.value.toString()}
          id={id}
          max={range.max}
          min={range.min}
          onInput={range.handleOnChange}
        />
      </div>
    );
  };

  private roundHSLValues = (hsl: Partial<HSLColorTypes>): HslSliderState => {
    return {
      hue: Math.round(hsl.color![0]),
      saturation: Math.round(hsl.color![1]),
      lightness: Math.round(hsl.color![2])
    };
  };

  public setHSLColorState = (value: string): void => {
    let hsl: Partial<HSLColorTypes>;
    try {
      hsl = Color(value).hsl();
      this.setState(this.roundHSLValues(hsl));
    } catch (error) {
      // console.error('bad hsl');
    }
  };

  public updateColor = (): void => {
    const hex = Color({
      h: this.state.hue,
      s: this.state.saturation,
      l: this.state.lightness
    }).hex();
    if (hex !== this.props.value) {
      this.props.onChange(hex, this.props.id);
    }
  };

  render() {
    const hslRanges: Array<Range> = [
      {
        label: 'Hue',
        min: 0,
        max: 360,
        value: this.state.hue,
        handleOnChange: this.handleHueChange,
        symbol: '°'
      },
      {
        label: 'Saturation',
        min: 0,
        max: 100,
        value: this.state.saturation,
        handleOnChange: this.handleSaturationChange,
        symbol: '%'
      },
      {
        label: 'Lightness',
        min: 0,
        max: 100,
        value: this.state.lightness,
        handleOnChange: this.handleLightnessChange,
        symbol: '%'
      }
    ];

    return (
      <div
        className={classNames('form-hsl-sliders', {
          'form-hsl-sliders--compact': this.props.variant === 'compact'
        })}
      >
        {hslRanges.map(this.renderRangeInput)}
      </div>
    );
  }
}

export default HslSlider;
