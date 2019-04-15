import React, { Component, ReactNode, ReactElement } from 'react';
import Head from 'next/head';
import { SiteData, ColorCombosTypes } from '../../../types';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';
import Color from 'color';
import { HomeProps } from '../../home';
import ColorCombos from '../../../utils/color-combos';
import Footer from '../../footer';

interface AppContainerProps {
  children: (args: HomeProps) => ReactNode;
  location?: {
    query?: object;
  };
  title: string;
}

interface AppContainerState {
  siteData: SiteData;
}

class AppContainer extends Component<AppContainerProps, AppContainerState> {
  public static defaultProps = {
    title: 'Are My Colours Accessible'
  };

  private constructor(props: AppContainerProps) {
    super(props);
    const initialCombos: ColorCombosTypes[] | false = ColorCombos(['#FFFFFF', '#1276CE']);
    if (initialCombos) {
      this.state = {
        siteData: {
          background: '#1276CE',
          textColor: '#FFFFFF',
          isLight: false,
          colorCombos: initialCombos
        }
      };
    }
  }

  public componentDidMount(): void {
    this.getQueryParams();
  }

  private checkBackgroundLightness = (hex: string): boolean => {
    let light;

    try {
      light = Color(hex).isLight();
    } catch (e) {
      light = true;
    }

    return light;
  };

  private getQueryParams = (): void => {
    if (isEmpty(window.location.search)) return;
    const query = qs.parse(window.location.search) as any;
    query.isLight = query.isLight === 'true';
    this.setState({
      siteData: Object.assign(query as SiteData, {
        colorCombos: ColorCombos([query.textColor, query.background])
      })
    });
  };

  public handleBackgroundColorInputChange = (value: string): void => {
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

  public handleTextColorInputChange = (value: string): void => {
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

  private isValidColor = (value: string): Color | false => {
    let color: Color | false = false;
    try {
      color = Color(value);
    } catch (error) {
      console.error('ColorInput invalid color');
    }
    return color;
  };

  private setNewColorCombo = (textColor: string, backgroundColor: string): void => {
    let newCombos: ColorCombosTypes[] | false = ColorCombos([textColor, backgroundColor]);
    if (newCombos) {
      if (textColor === backgroundColor) {
        newCombos = this.createDuplicateCombination(newCombos);
      }
      this.setState(
        {
          siteData: {
            ...this.state.siteData,
            background: backgroundColor,
            colorCombos: newCombos,
            isLight: this.checkBackgroundLightness(backgroundColor),
            textColor: textColor
          }
        },
        debounce(this.updateHash, 200)
      );
    }
  };

  private createDuplicateCombination = (combos: ColorCombosTypes[]): ColorCombosTypes[] => {
    const dupeCombo = {
      ...combos[0],
      combinations: [this.createFakeCombination(combos[0].color, combos[0].hex)]
    };
    return [dupeCombo, dupeCombo];
  };

  private createFakeCombination = (color: number[], hex: string): {} => {
    return {
      model: 'rgb',
      color: color,
      valpha: 1,
      hex: hex,
      contrast: 1,
      accessibility: { aa: false, aaLarge: false, aaa: false, aaaLarge: false }
    };
  };

  public updateHash = (): void => {
    const query = '?' + qs.stringify(this.state.siteData);
    window.history.pushState(this.state, 'Are My Colors Accessible', query);
  };

  public render(): ReactElement<HTMLDivElement> {
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
          handleBackgroundColorSliderChange: this.handleBackgroundColorInputChange,
          handleTextColorInputChange: this.handleTextColorInputChange,
          handleTextColorSliderChange: this.handleTextColorInputChange
        })}

        <Footer styles={styles} />
      </div>
    );
  }
}
export default AppContainer;
