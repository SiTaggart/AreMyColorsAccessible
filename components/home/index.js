import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Colorable from 'colorable';
import Container from '../layouts/container';
import LayoutSmall from '../layouts/layout-small';
import LayoutLarge from '../layouts/layout-large';
import Results from '../results';
import ColorInputs from '../colorInputs';
import './home-styles.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.setBackgroundColor = this.setBackgroundColor.bind(this);
    this.setTextColorColor = this.setTextColorColor.bind(this);
  }

  getColorInfo(background, textColor) {
    let colorInfo;
    const dummyColorInfo = {
      contrast: 0,
      accessibility: {
        aaa: false,
        aa: false,
        aaaLarge: false,
        aaLarge: false
      }
    };
    try {
      colorInfo = !Colorable([textColor, background])[0].combinations.length
        ? dummyColorInfo
        : Colorable([textColor, background])[0].combinations[0];
    } catch (e) {
      colorInfo = dummyColorInfo;
    }
    return colorInfo;
  }

  setBackgroundColor(hex) {
    this.props.setBackgroundColor(hex);
  }

  setTextColorColor(hex) {
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

Home.propTypes = {
  setBackgroundColor: PropTypes.func,
  setTextColorColor: PropTypes.func,
  siteData: PropTypes.shape({
    background: PropTypes.string,
    textColor: PropTypes.string,
    isLight: PropTypes.bool
  })
};

export default Home;
