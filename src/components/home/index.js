import React, { Component, PropTypes } from 'react';
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
        const foreground = this.props.siteData.foreground;
        const background = this.props.siteData.background;
        const colorInfo = this.getColorInfo(background, foreground);

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
