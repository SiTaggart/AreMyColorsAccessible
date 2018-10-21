import React, { Component, ReactElement } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';
import Color from 'color';
import '../../../styles/index.scss';

interface LayoutSharedProps {
  children: ReactElement<any>;
  location?: {
    query?: object;
  };
  title: string;
}

interface SiteData {
  background: string;
  textColor: string;
  isLight: boolean;
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
        isLight: false
      }
    };
    this.setBackgroundColor = this.setBackgroundColor.bind(this);
    this.setTextColorColor = this.setTextColorColor.bind(this);
    this.updateHash = this.updateHash.bind(this);
  }

  componentDidMount() {
    this.getQueryParams();
  }

  checkBackgroundLightness(hex: string) {
    let light;

    try {
      light = Color(hex).isLight();
    } catch (e) {
      light = true;
    }

    return light;
  }

  getQueryParams() {
    if (isEmpty(window.location.search)) return;
    const query = qs.parse(window.location.search);
    query.isLight = query.isLight === 'true';
    this.setState({ siteData: Object.assign({}, query) });
  }

  setBackgroundColor(hex: string) {
    let siteData = this.state.siteData;
    siteData.background = hex;
    siteData.isLight = this.checkBackgroundLightness(hex);
    this.setState({ siteData: siteData }, debounce(this.updateHash, 200));
  }

  setTextColorColor(hex: string) {
    let siteData = this.state.siteData;
    siteData.textColor = hex;
    this.setState({ siteData: siteData }, debounce(this.updateHash, 200));
  }

  updateHash() {
    const query = '?' + qs.stringify(this.state.siteData);
    window.history.pushState(this.state, 'Are My Colors Accessible', query);
  }

  render() {
    const styles = {
      footerLinks: {
        color: this.state.siteData.isLight ? '#222' : '#fff'
      }
    };

    return (
      <div className="appContainer">
        <Head>
          <title>{this.props.title}</title>
          <style>{`
            body {
              background-color: ${this.state.siteData.background};
              color: ${this.state.siteData.textColor};
            }
          `}</style>
        </Head>

        {React.cloneElement(this.props.children, {
          siteData: this.state.siteData,
          setBackgroundColor: this.setBackgroundColor,
          setTextColorColor: this.setTextColorColor
        })}

        <footer className="footer">
          <nav>
            <ul>
              <li>
                <Link href="/">
                  <a style={styles.footerLinks}>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a style={styles.footerLinks}>About</a>
                </Link>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    );
  }
}
export default LayoutShared;
