import React from 'react';
import Color from 'color';
import ColorCombos from '../utils/color-combos';
import { ColorCombosTypes } from '../types';

import Container from '../components/layouts/container';
import Layout from '../components/layouts/layout';
import Footer from '../components/footer';
import PaletteInput from '../components/palette-input';
import ColorMatrix from '../components/color-matrix';

interface IPaletteState {
  colors: string[];
  colorCombos: Array<ColorCombosTypes> | false;
  hasError: boolean;
}

class Palette extends React.Component<{}, IPaletteState> {
  state = { colors: [], colorCombos: [], hasError: false };

  convertColorStringsToColors = (colorStrings: string[]): Color[] | false => {
    let isValidColor: boolean = true;
    const colorTypes: Color[] = [];

    colorStrings.forEach((color: string) => {
      try {
        colorTypes.push(Color(color));
      } catch (error) {
        isValidColor = false;
      }
    });

    if (isValidColor) {
      return colorTypes;
    } else {
      return isValidColor;
    }
  };

  convertColorValuesToArray = (colors: string): string[] => {
    const colorsArr: string[] = colors.split(/[ ,]+/).filter(Boolean);
    const dedupedColors = colorsArr.filter((color, index, self) => self.indexOf(color) === index);
    return dedupedColors;
  };

  handleColorChange = (value: string, index: number) => {
    const newColors: string[] = [...this.state.colors];
    newColors[index] = value;
    this.updateColors(newColors, !!this.isValidColor(value));
  };

  handleNewColor = (colors: string) => {
    const colorsArray: string[] = this.convertColorValuesToArray(colors);
    const convertedColors: Color[] | false = this.convertColorStringsToColors(colorsArray);
    const mergedColors: string[] = this.mergeColorsWithState(colorsArray);

    if (convertedColors !== false) {
      this.updateColors(mergedColors, true);
    } else {
      this.setState({ hasError: true });
    }
  };

  isValidColor = (hex: string) => {
    let color: Color | false = false;
    try {
      color = Color(hex);
    } catch (error) {}
    return color;
  };

  mergeColorsWithState = (colors: string[]): string[] => {
    const filteredColors: string[] = colors.filter(
      color => (this.state.colors as string[]).indexOf(color) < 0
    );
    return [...this.state.colors, ...filteredColors];
  };

  updateColors = (colors: string[], isValidColor: boolean) => {
    this.setState({
      colorCombos: isValidColor ? ColorCombos(colors) : this.state.colorCombos,
      colors,
      hasError: false
    });
  };

  render() {
    return (
      <Container variant="palette">
        <Layout variant="full">
          <PaletteInput
            errorMessage={
              this.state.hasError
                ? 'Please enter valid colors as comma or space separated hex values'
                : undefined
            }
            onColorAdd={this.handleNewColor}
          />
          <ColorMatrix
            colorCombos={this.state.colorCombos}
            colors={this.state.colors}
            onColorChange={this.handleColorChange}
          />
        </Layout>
        <Footer />
      </Container>
    );
  }
}

export default Palette;
