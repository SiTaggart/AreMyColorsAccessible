import React, { Component } from 'react';
import HslSlider from '../hsl-slider';
import FormLabel from '../form-label';
import FormInput from '../form-input';
import FormControl from '../form-control';
import Form from '../form';
import { ColorCombosTypes } from '../../types';

export interface ColorInputsProps {
  background: string;
  colorCombos: Array<ColorCombosTypes>;
  isLight: boolean;
  handleBackgroundColorInputChange: (value: string) => void;
  handleBackgroundColorSliderChange: (hex: string) => void;
  handleTextColorInputChange: (value: string) => void;
  handleTextColorSliderChange: (hex: string) => void;
  textColor: string;
}

class ColorInputs extends Component<ColorInputsProps, {}> {
  render() {
    const { textColor, background, colorCombos } = this.props;
    const formTextColor = this.props.isLight ? '#343334' : '#fff';
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
            onChange={e => this.props.handleTextColorInputChange(e.target.value)}
            style={styles.input}
            value={textColor}
          />
          <HslSlider
            id="textColor-hsl"
            onChange={this.props.handleTextColorSliderChange}
            value={colorCombos[0].hex}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="background">Background</FormLabel>
          <FormInput
            id="background"
            onChange={e => this.props.handleBackgroundColorInputChange(e.target.value)}
            style={styles.input}
            value={background}
          />
          <HslSlider
            id="background-hsl"
            onChange={this.props.handleBackgroundColorSliderChange}
            value={colorCombos[1].hex}
          />
        </FormControl>
      </Form>
    );
  }
}

export default ColorInputs;
