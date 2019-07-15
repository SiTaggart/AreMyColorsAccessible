import React, { Component, ReactElement } from 'react';
import { SiteData, ColorCombinationTypes } from '../../types';
import Container from '../layouts/container';
import Layout from '../layouts/layout';
import Results from '../results';
import ColorInputs from '../colorInputs';

export interface HomeProps {
  handleBackgroundColorInputChange: (value: string) => void;
  handleBackgroundColorSliderChange: (hex: string) => void;
  handleTextColorInputChange: (value: string) => void;
  handleTextColorSliderChange: (hex: string) => void;
  siteData: SiteData;
}

class Home extends Component<HomeProps, {}> {
  public render(): ReactElement {
    const siteData: SiteData = this.props.siteData;
    const colorInfo: Partial<ColorCombinationTypes> = siteData.colorCombos[0].combinations[0];

    return (
      <Container variant="home">
        <Layout variant="small">
          <Results
            accessibility={colorInfo.accessibility}
            contrast={colorInfo.contrast}
            isLight={siteData.isLight}
          />
        </Layout>
        <Layout variant="large">
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
        </Layout>
      </Container>
    );
  }
}

export default Home;
