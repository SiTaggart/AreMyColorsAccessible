import React, { Component } from 'react';
import HslSlider from '../hsl-slider';
import './colorInputs.scss';

interface ColorInputsProps {
  background: string;
  isLight: boolean;
  setBackgroundColor: (...args: any[]) => any;
  setTextColorColor: (...args: any[]) => any;
  textColor: string;
}

class ColorInputs extends Component<ColorInputsProps, {}> {
  private textColorRef = React.createRef<HslSlider>();
  private backgroundColorRef = React.createRef<HslSlider>();

  constructor(props: ColorInputsProps) {
    super(props);
    this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    this.handleTextColorChange = this.handleTextColorChange.bind(this);
  }

  componentDidUpdate() {
    this.textColorRef.current!.setHSLColorState(this.props.textColor);
    this.backgroundColorRef.current!.setHSLColorState(this.props.background);
  }

  handleBackgroundChange(e: React.ChangeEvent<HTMLInputElement>): void {
    let newBackgroundColor;
    if (!e.target) {
      newBackgroundColor = e;
    } else {
      newBackgroundColor = e.target.value;
    }
    this.props.setBackgroundColor(newBackgroundColor);
  }

  handleTextColorChange(e: React.ChangeEvent<HTMLInputElement>): void {
    let newTextColorColor;
    if (!e.target) {
      newTextColorColor = e;
    } else {
      newTextColorColor = e.target.value;
    }
    this.props.setTextColorColor(newTextColorColor);
  }

  render() {
    const textColor = this.props.textColor;
    const background = this.props.background;
    const formTextColor = this.props.isLight ? '#222' : '#fff';
    const styles = {
      form: {
        color: formTextColor
      },
      input: {
        borderColor: formTextColor,
        color: 'inherit'
      }
    };

    return (
      <form className="form" style={styles.form}>
        <div className="form-control">
          <label className="form-label" htmlFor="textColor">
            Text Color
          </label>
          <input
            className="form-input"
            id="textColor"
            onChange={this.handleTextColorChange}
            style={styles.input}
            type="text"
            value={textColor}
          />
          <HslSlider
            id="textColor-hsl"
            onChange={this.handleTextColorChange}
            ref={this.textColorRef}
            value={textColor}
          />
        </div>
        <div className="form-control">
          <label className="form-label" htmlFor="background">
            Background
          </label>
          <input
            className="form-input"
            id="background"
            onChange={this.handleBackgroundChange}
            style={styles.input}
            type="text"
            value={background}
          />
          <HslSlider
            id="background-hsl"
            onChange={this.handleBackgroundChange}
            ref={this.backgroundColorRef}
            value={background}
          />
        </div>
      </form>
    );
  }
}

export default ColorInputs;
