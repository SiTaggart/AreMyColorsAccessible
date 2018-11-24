import React from 'react';
import Color from 'color';
import Container from '../components/layouts/container';
import LayoutLarge from '../components/layouts/layout-large';

import '../styles/index.scss';
import Footer from '../components/footer';
import PaletteInput from '../components/palette-input';
import ColorMatrix from '../components/color-matrix';

interface IPaletteState {
  colors: Color[];
  hasError: boolean;
}

class Palette extends React.Component<{}, IPaletteState> {
  state = { colors: [], hasError: false };

  mergeColorsWithState = (colors: Color[]): Color[] => {
    const filteredColors: Color[] = colors.filter(color => {
      let index = this.state.colors.findIndex((stateColor: Color) => {
        return stateColor.hex() === color.hex();
      });
      return index < 0;
    });
    const newColors: Color[] = [...this.state.colors, ...filteredColors];
    return newColors;
  };

  convertColorStringsToColors = (colorStrings: string[]): Color[] | false => {
    let isValidColor: boolean = true;
    const colorTypes: Color[] = [];

    const dedupedColors = colorStrings.filter(
      (color, index, self) => self.indexOf(color) === index
    );

    dedupedColors.forEach((color: string) => {
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
    return colors.split(/[ ,]+/).filter(Boolean);
  };

  handleNewColor = (colors: string) => {
    const colorsArray: string[] = this.convertColorValuesToArray(colors);
    const convertedColors: Color[] | false = this.convertColorStringsToColors(colorsArray);
    if (convertedColors !== false) {
      this.setState({
        colors: this.mergeColorsWithState(convertedColors),
        hasError: false
      });
    } else {
      this.setState({ hasError: true });
    }
  };

  render() {
    return (
      <Container>
        <LayoutLarge>
          <h1>This is a palette</h1>
          <PaletteInput
            errorMessage={
              this.state.hasError
                ? 'Please enter valid colors as comma or space separated hex values'
                : undefined
            }
            onColorAdd={this.handleNewColor}
          />
          <ColorMatrix colors={this.state.colors} />
        </LayoutLarge>
        <Footer />
      </Container>
    );
  }
}

export default Palette;
