import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';
import Color from 'color';
import '../../../styles/index.scss';

class LayoutShared extends Component {
  static defaultProps = {
    title: 'Are My Colours Accessible'
  };

  constructor(props) {
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

  checkBackgroundLightness(hex) {
    let light;

    try {
      light = Color(hex).light();
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

  setBackgroundColor(hex) {
    let siteData = this.state.siteData;
    siteData.background = hex;
    siteData.isLight = this.checkBackgroundLightness(hex);
    this.setState({ siteData: siteData }, debounce(this.updateHash, 200));
  }

  setTextColorColor(hex) {
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
LayoutShared.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    query: PropTypes.object
  }),
  title: PropTypes.string.isRequired
};
export default LayoutShared;
