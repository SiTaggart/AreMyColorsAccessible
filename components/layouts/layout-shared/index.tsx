import React, { Component, ReactNode } from 'react';
import Head from 'next/head';
import { SiteData } from '../../../types';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';
import Color from 'color';
import { HomeProps } from '../../home';
import Footer from '../../footer';
import ColorCombos from '../../../utils/color-combos';

interface LayoutSharedProps {
  children: (args: HomeProps) => ReactNode;
  location?: {
    query?: object;
  };
  title: string;
}

interface LayoutSharedState {
  siteData: SiteData;
}

class LayoutShared extends Component<LayoutSharedProps, LayoutSharedState> {
  static defaultProps = {
    title: 'Are My Colours Accessible'
  };

  constructor(props: LayoutSharedProps) {
    super(props);
    this.state = {
      siteData: {
        background: '#1276CE',
        textColor: '#FFFFFF',
        isLight: false,
        colorCombos: ColorCombos(['#FFFFFF', '#1276CE'])
      }
    };
  }

  componentDidMount() {
    this.getQueryParams();
  }

  checkBackgroundLightness = (hex: string) => {
    let light;

    try {
      light = Color(hex).isLight();
    } catch (e) {
      light = true;
    }

    return light;
  };

  getQueryParams = () => {
    if (isEmpty(window.location.search)) return;
    const query = qs.parse(window.location.search) as any;
    query.isLight = query.isLight === 'true';
    this.setState({
      siteData: Object.assign(query as SiteData, {
        colorCombos: ColorCombos([query.textColor, query.background])
      })
    });
  };

  handleBackgroundColorInputChange = (value: string) => {
    this.setState({
      siteData: {
        ...this.state.siteData,
        background: value
      }
    });
    if (this.isValidColor(value)) {
      this.setNewColorCombo(this.state.siteData.textColor, value);
    }
  };

  handleBackgroundColorSliderChange = (hex: string) => {
    this.setState(
      {
        siteData: {
          ...this.state.siteData,
          background: hex,
          colorCombos: ColorCombos([this.state.siteData.colorCombos[0].hex, hex]),
          isLight: this.checkBackgroundLightness(hex)
        }
      },
      debounce(this.updateHash, 200)
    );
  };

  handleTextColorInputChange = (value: string) => {
    this.setState({
      siteData: {
        ...this.state.siteData,
        textColor: value
      }
    });
    if (this.isValidColor(value)) {
      this.setNewColorCombo(value, this.state.siteData.background);
    }
  };

  handleTextColorSliderChange = (hex: string) => {
    this.setState(
      {
        siteData: {
          ...this.state.siteData,
          textColor: hex,
          colorCombos: ColorCombos([hex, this.state.siteData.colorCombos[1].hex])
        }
      },
      debounce(this.updateHash, 200)
    );
  };

  isValidColor = (value: string): Color | false => {
    let color: Color | false = false;
    try {
      color = Color(value);
    } catch (error) {
      console.error('ColorInput invalid color');
    }
    return color;
  };

  setNewColorCombo = (textColor: string, backgroundColor: string) => {
    this.setState(
      {
        siteData: {
          ...this.state.siteData,
          background: backgroundColor,
          colorCombos: ColorCombos([textColor, backgroundColor]),
          isLight: this.checkBackgroundLightness(backgroundColor),
          textColor: textColor
        }
      },
      debounce(this.updateHash, 200)
    );
  };

  updateHash = () => {
    const query = '?' + qs.stringify(this.state.siteData);
    window.history.pushState(this.state, 'Are My Colors Accessible', query);
  };

  render() {
    const styles = {
      footerLinks: {
        color: this.state.siteData.isLight ? '#343334' : '#fff'
      }
    };
    return (
      <div className="appContainer">
        <Head>
          <title>{this.props.title}</title>
          <style>{`
            body {
              background-color: ${this.state.siteData.colorCombos[1].hex};
              color: ${this.state.siteData.colorCombos[0].hex};
            }
          `}</style>
        </Head>

        {this.props.children({
          siteData: this.state.siteData,
          handleBackgroundColorInputChange: this.handleBackgroundColorInputChange,
          handleBackgroundColorSliderChange: this.handleBackgroundColorSliderChange,
          handleTextColorInputChange: this.handleTextColorInputChange,
          handleTextColorSliderChange: this.handleTextColorSliderChange
        })}

        <Footer styles={styles} />
      </div>
    );
  }
}
export default LayoutShared;
