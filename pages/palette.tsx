import React from 'react';
import Container from '../components/layouts/container';
import LayoutLarge from '../components/layouts/layout-large';

import '../styles/index.scss';
import Footer from '../components/footer';
import PaletteInput from '../components/palette-input';

class Palette extends React.Component<{}, {}> {
  handleNewColor = (hex: string[]) => {
    console.log('handle new color: ', hex);
  };

  render() {
    return (
      <Container>
        <LayoutLarge>
          <h1>This is a palette</h1>
          <PaletteInput onColorAdd={this.handleNewColor} />
        </LayoutLarge>
        <Footer />
      </Container>
    );
  }
}

export default Palette;
