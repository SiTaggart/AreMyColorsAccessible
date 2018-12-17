import React, { Component } from 'react';
import { SiteData, ColorCombinationTypes } from '../../types';
import Container from '../layouts/container';
import LayoutSmall from '../layouts/layout-small';
import LayoutLarge from '../layouts/layout-large';
import Results from '../results';
import ColorInputs from '../colorInputs';
import './home-styles.scss';

export interface HomeProps {
  handleBackgroundColorInputChange: (value: string) => void;
  handleBackgroundColorSliderChange: (hex: string) => void;
  handleTextColorInputChange: (value: string) => void;
  handleTextColorSliderChange: (hex: string) => void;
  siteData: SiteData;
}

class Home extends Component<HomeProps, {}> {
  render() {
    const siteData: SiteData = this.props.siteData;
    const colorInfo: Partial<ColorCombinationTypes> = siteData.colorCombos[0].combinations[0];

    return (
      <Container className="home">
        <LayoutSmall>
          <Results
            accessibility={colorInfo.accessibility!}
            contrast={colorInfo.contrast!}
            isLight={siteData.isLight}
          />
        </LayoutSmall>
        <LayoutLarge>
          <ColorInputs
            background={siteData.background}
            colorCombos={siteData.colorCombos}
            handleBackgroundColorInputChange={this.props.handleBackgroundColorInputChange}
            handleBackgroundColorSliderChange={this.props.handleBackgroundColorSliderChange}
            handleTextColorInputChange={this.props.handleTextColorInputChange}
            handleTextColorSliderChange={this.props.handleTextColorSliderChange}
            isLight={siteData.isLight}
            textColor={siteData.textColor}
          />
        </LayoutLarge>
      </Container>
    );
  }
}

export default Home;
