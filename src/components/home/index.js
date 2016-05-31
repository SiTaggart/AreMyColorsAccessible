import React, { Component, PropTypes } from 'react';
import Color from 'color';
import Colorable from 'colorable';
import './home-styles.scss';
import { Container, LayoutSmall, LayoutLarge } from '../layouts';
import Results from '../results';
import ColorInputs from '../colorInputs';

class Home extends Component {

    constructor(props) {
        super(props);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
        this.setForegroundColor = this.setForegroundColor.bind(this);
        this.calcComboBrightness = this.calcComboBrightness.bind(this);
        this.calcComboDifference = this.calcComboDifference.bind(this);
    }

    calcColorBrightness(rgb) {
        return ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
    }

    calcComboBrightness(background, foreground) {
        let backgroundBrightness = this.calcColorBrightness(background);
        let foregroundBrightness = this.calcColorBrightness(foreground);
        let brightness = Math.abs(foregroundBrightness - backgroundBrightness);

        return Math.round(brightness);
    }

    calcComboDifference(background, foreground) {
        let maxRed = Math.max(background.r, foreground.r);
        let minRed = Math.min(background.r, foreground.r);
        let maxGreen = Math.max(background.g, foreground.g);
        let minGreen = Math.min(background.g, foreground.g);
        let maxBlue = Math.max(background.b, foreground.b);
        let minBlue = Math.min(background.b, foreground.b);
        let redDiff = maxRed - minRed;
        let greenDiff = maxGreen - minGreen;
        let blueDiff = maxBlue - minBlue;

        let difference = redDiff + greenDiff + blueDiff;

        return difference;
    }

    convertToRGB(hex) {
        let rgbColor;

        try {
            rgbColor = Color(hex).rgb();
        } catch (error) {
            rgbColor = {
                r: 0,
                g: 0,
                b: 0
            };
        }

        return rgbColor;
    }

    getColorInfo(background, foreground) {
        let colorInfo;
        try {
            colorInfo = Colorable([foreground, background])[0].combinations[0];
        } catch(e) {
            colorInfo = {
                contrast: 0,
                accessibility: {
                    aaa: false,
                    aa: false,
                    aaaLarge: false,
                    aaLarge: false
                }
            };
        }
        return colorInfo;
    }

    setBackgroundColor(hex) {
        this.props.setBackgroundColor(hex);
    }

    setForegroundColor(hex) {
        this.props.setForegroundColor(hex);
    }

    render() {
        let foreground = this.props.siteData.foreground;
        let background = this.props.siteData.background;
        let backgroundRGB = this.convertToRGB(background);
        let foregroundRGB = this.convertToRGB(foreground);
        let colorInfo = this.getColorInfo(background, foreground);

        colorInfo.colorBrightness = this.calcComboBrightness(backgroundRGB, foregroundRGB);
        colorInfo.colorDifference = this.calcComboDifference(backgroundRGB, foregroundRGB);

        return (
            <Container className="home">
                <LayoutSmall>
                    <Results {...colorInfo} />
                </LayoutSmall>
                <LayoutLarge>
                    <ColorInputs
                        background={this.props.siteData.background}
                        foreground={this.props.siteData.foreground}
                        isLight={this.props.siteData.isLight}
                        setForegroundColor={this.setForegroundColor}
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
    setForegroundColor: PropTypes.func,
    siteData: PropTypes.shape({
        background: PropTypes.string,
        foreground: PropTypes.string,
        isLight: PropTypes.bool
    })
};

export default Home;
