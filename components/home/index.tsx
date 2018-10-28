import React, { Component } from 'react';
import { SiteData, ColorCombinationTypes } from '../../types';
import ColorCombos from '../../utils/color-combos';
import Container from '../layouts/container';
import LayoutSmall from '../layouts/layout-small';
import LayoutLarge from '../layouts/layout-large';
import Results from '../results';
import ColorInputs from '../colorInputs';
import './home-styles.scss';

interface HomeProps {
  setBackgroundColor: (...args: any[]) => any;
  setTextColorColor: (...args: any[]) => any;
  siteData: SiteData;
}

class Home extends Component<HomeProps, {}> {
  constructor(props: HomeProps) {
    super(props);
    this.setBackgroundColor = this.setBackgroundColor.bind(this);
    this.setTextColorColor = this.setTextColorColor.bind(this);
  }

  getColorInfo(background: string, textColor: string) {
    let colorInfo: Partial<ColorCombinationTypes>;

    const dummyColorInfo: Partial<ColorCombinationTypes> = {
      contrast: 0,
      accessibility: {
        aaa: false,
        aa: false,
        aaaLarge: false,
        aaLarge: false
      }
    };

    try {
      if (ColorCombos([textColor, background]) !== false) {
        colorInfo = ColorCombos([textColor, background])[0].combinations[0];
      } else {
        colorInfo = dummyColorInfo;
      }
    } catch (e) {
      colorInfo = dummyColorInfo;
    }

    console.log(colorInfo);

    return colorInfo;
  }

  setBackgroundColor(hex: string) {
    this.props.setBackgroundColor(hex);
  }

  setTextColorColor(hex: string) {
    this.props.setTextColorColor(hex);
  }

  render() {
    const textColor = this.props.siteData.textColor;
    const background = this.props.siteData.background;
    const colorInfo = this.getColorInfo(background, textColor);

    return (
      <Container className="home">
        <LayoutSmall>
          <Results {...colorInfo} isLight={this.props.siteData.isLight} />
        </LayoutSmall>
        <LayoutLarge>
          <ColorInputs
            background={this.props.siteData.background}
            isLight={this.props.siteData.isLight}
            setBackgroundColor={this.setBackgroundColor}
            setTextColorColor={this.setTextColorColor}
            textColor={this.props.siteData.textColor}
          />
        </LayoutLarge>
      </Container>
    );
  }
}

export default Home;
