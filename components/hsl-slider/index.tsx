import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import './hsl-slider.scss';

class HslSlider extends Component {
  constructor(props) {
    super(props);
    const hsl = Color(this.props.value).hsl();
    this.state = {
      hue: hsl.color[0],
      saturation: hsl.color[1],
      lightness: hsl.color[2]
    };
    this.handleHueChange = this.handleHueChange.bind(this);
    this.handleSaturationChange = this.handleSaturationChange.bind(this);
    this.handleLightnessChange = this.handleLightnessChange.bind(this);
    this.renderRangeInput = this.renderRangeInput.bind(this);
    this.updateColor = this.updateColor.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state, nextState);
  }

  handleHueChange(e) {
    this.setState(
      {
        hue: parseInt(e.target.value)
      },
      debounce(this.updateColor, 200)
    );
  }

  handleSaturationChange(e) {
    this.setState(
      {
        saturation: parseInt(e.target.value)
      },
      debounce(this.updateColor, 200)
    );
  }

  handleLightnessChange(e) {
    this.setState(
      {
        lightness: parseInt(e.target.value)
      },
      debounce(this.updateColor, 200)
    );
  }

  renderRangeInput(range) {
    const id = this.props.id + '-' + range.label;
    return (
      <div className="form-hsl-slider" key={id}>
        <label className="form-label" htmlFor={id}>
          {range.label} {range.value + range.symbol}
        </label>
        <input
          className="form-range"
          defaultValue={range.value}
          id={id}
          max={range.max}
          min={range.min}
          onInput={range.handleOnChange}
          type="range"
        />
      </div>
    );
  }

  setHSLColorState(value) {
    let hsl;
    try {
      hsl = Color(value).hsl();
      this.setState({
        hue: hsl.color[0],
        saturation: hsl.color[1],
        lightness: hsl.color[2]
      });
    } catch (error) {
      // console.error('bad hsl');
    }
  }

  updateColor() {
    const hex = Color({
      h: this.state.hue,
      s: this.state.saturation,
      l: this.state.lightness
    }).hex();
    if (hex !== this.props.value) {
      this.props.onChange(hex);
    }
  }

  render() {
    const hslRanges = [
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

HslSlider.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default HslSlider;
