import React from 'react';
import Color from 'color';
import Container from '../components/layouts/container';
import LayoutFull from '../components/layouts/layout-full';

import Footer from '../components/footer';
import PaletteInput from '../components/palette-input';
import ColorMatrix from '../components/color-matrix';

interface IPaletteState {
  colors: string[];
  hasError: boolean;
}

class Palette extends React.Component<{}, IPaletteState> {
  state = { colors: [], hasError: false };

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
      this.updateColors(mergedColors);
    } else {
      this.setState({ hasError: true });
    }
  };

  handleColorChange = (newColors: string[]) => {
    this.updateColors(newColors);
  };

  updateColors = (colors: string[]) => {
    this.setState({
      colors: colors,
      hasError: false
    });
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
          <ColorMatrix colors={this.state.colors} onColorChange={this.handleColorChange} />
        </LayoutFull>
        <Footer />
      </Container>
    );
  }
}

export default Palette;
