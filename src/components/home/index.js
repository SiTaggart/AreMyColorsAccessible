import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Colorable from 'colorable';
import './home-styles.scss';
import { Container, LayoutSmall, LayoutLarge } from '../layouts';
import Results from '../results';
import ColorInputs from '../colorInputs';

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
            colorInfo = !Colorable([textColor, background])[0].combinations.length ? dummyColorInfo : Colorable([textColor, background])[0].combinations[0];
        } catch(e) {
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
                        textColor={this.props.siteData.textColor}
                        isLight={this.props.siteData.isLight}
                        setTextColorColor={this.setTextColorColor}
                        setBackgroundColor={this.setBackgroundColor}
                    />
                </LayoutLarge>
                {this.props.children}
            </Container>
        );
    }
}

Home.propTypes = {
    children: PropTypes.node,
    setBackgroundColor: PropTypes.func,
    setTextColorColor: PropTypes.func,
    siteData: PropTypes.shape({
        background: PropTypes.string,
        textColor: PropTypes.string,
        isLight: PropTypes.bool
    })
};

export default Home;
