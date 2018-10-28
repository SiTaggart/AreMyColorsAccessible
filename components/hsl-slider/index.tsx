import React, { Component, ReactNode } from 'react';
import Color from 'color';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import './hsl-slider.scss';

interface HslSliderProps {
  id: string;
  onChange: (...args: any[]) => any;
  value: string;
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

class HslSlider extends Component<HslSliderProps, HslSliderState> {
  constructor(props: HslSliderProps) {
    super(props);
    const hsl: Color = Color(this.props.value).hsl();
    this.state = this.roundHSLValues(hsl);
    this.updateColor = this.updateColor.bind(this);
  }

  shouldComponentUpdate(nextProps: HslSliderProps, nextState: HslSliderState): boolean {
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
      <div className="form-hsl-slider" key={id}>
        <label className="form-label" htmlFor={id}>
          {range.label} {range.value + range.symbol}
        </label>
        <input
          className="form-range"
          defaultValue={range.value.toString()}
          id={id}
          max={range.max}
          min={range.min}
          onInput={range.handleOnChange}
          type="range"
        />
      </div>
    );
  };

  private roundHSLValues = (hsl: Color): HslSliderState => {
    return {
      hue: Math.round(hsl.color[0]),
      saturation: Math.round(hsl.color[1]),
      lightness: Math.round(hsl.color[2])
    };
  };

  public setHSLColorState = (value: string): void => {
    let hsl: Color;
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
      this.props.onChange(hex);
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

    return <div className="form-hsl-sliders">{hslRanges.map(this.renderRangeInput)}</div>;
  }
}

export default HslSlider;
