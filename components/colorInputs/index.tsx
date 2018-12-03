import React, { Component } from 'react';
import HslSlider from '../hsl-slider';
import FormLabel from '../form-label';
import FormInput from '../form-input';
import FormControl from '../form-control';
import Form from '../form';

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
    this.props.setBackgroundColor(e.target.value);
  }

  handleBackgroundChangeFromSlider = (hex: string) => {
    this.props.setBackgroundColor(hex);
  };

  handleTextColorChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.props.setTextColorColor(e.target.value);
  }

  handleTextColorChangeFromSlider = (hex: string) => {
    this.props.setTextColorColor(hex);
  };

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
      <Form style={styles.form}>
        <FormControl>
          <FormLabel htmlFor="textColor">Text Color</FormLabel>
          <FormInput
            id="textColor"
            onChange={this.handleTextColorChange}
            style={styles.input}
            value={textColor}
          />
          <HslSlider
            id="textColor-hsl"
            onChange={this.handleTextColorChangeFromSlider}
            ref={this.textColorRef}
            value={textColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="background">Background</FormLabel>
          <FormInput
            id="background"
            onChange={this.handleBackgroundChange}
            style={styles.input}
            value={background}
          />
          <HslSlider
            id="background-hsl"
            onChange={this.handleBackgroundChangeFromSlider}
            ref={this.backgroundColorRef}
            value={background}
          />
        </FormControl>
      </Form>
    );
  }
}

export default ColorInputs;
