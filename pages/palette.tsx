import React from 'react';
import Color from 'color';
import Container from '../components/layouts/container';
import LayoutFull from '../components/layouts/layout-full';

import '../styles/index.scss';
import Footer from '../components/footer';
import PaletteInput from '../components/palette-input';
import ColorMatrix from '../components/color-matrix';
import ColorCombos from '../utils/color-combos';
import { ColorCombosTypes } from '../types';

interface IPaletteState {
  colors: string[];
  colorCombinations: Array<ColorCombosTypes> | false;
  hasError: boolean;
}

class Palette extends React.Component<{}, IPaletteState> {
  state = { colors: [], colorCombinations: [], hasError: false };

  mergeColorsWithState = (colors: string[]): string[] => {
    const filteredColors: string[] = colors.filter(
      color => (this.state.colors as string[]).indexOf(color) < 0
    );
    const newColors: string[] = [...this.state.colors, ...filteredColors];
    return newColors;
  };

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

  handleNewColor = (colors: string) => {
    const colorsArray: string[] = this.convertColorValuesToArray(colors);
    const convertedColors: Color[] | false = this.convertColorStringsToColors(colorsArray);
    const mergedColors = this.mergeColorsWithState(colorsArray);

    if (convertedColors !== false) {
      this.setState({
        colors: this.mergeColorsWithState(mergedColors),
        colorCombinations: ColorCombos(mergedColors),
        hasError: false
      });
    } else {
      this.setState({ hasError: true });
    }
  };

  render() {
    return (
      <Container>
        <LayoutFull>
          <PaletteInput
            errorMessage={
              this.state.hasError
                ? 'Please enter valid colors as comma or space separated hex values'
                : undefined
            }
            onColorAdd={this.handleNewColor}
          />
          <ColorMatrix colorCombos={this.state.colorCombinations} colors={this.state.colors} />
        </LayoutFull>
        <Footer />
      </Container>
    );
  }
}

export default Palette;
