import React, { Component, PropTypes } from 'react';
import Colorable from 'colorable';
import './home-styles.scss';
import Results from '../results';
import ColorInputs from '../colorInputs';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            background: '#1276CE',
            foreground: '#fff'
        };
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
        this.setForegroundColor = this.setForegroundColor.bind(this);
    }

    componentDidMount() {
        console.log('check params');
    }

    setBackgroundColor(hex) {
        this.setState({background: hex});
    }

    setForegroundColor(hex) {
        this.setState({foreground: hex});
    }

    render() {
        let foreground = this.state.foreground;
        let background = this.state.background;
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

        let styles = {
            container: {
                background: background,
                color: foreground
            }
        };

        return (
            <main className="home" style={styles.container}>
                <Results {...colorInfo} />
                <ColorInputs
                    {...this.props}
                    {...this.state}
                    setForegroundColor={this.setForegroundColor}
                    setBackgroundColor={this.setBackgroundColor}
                />
                {this.props.children}
            </main>
        );
    }
}

Home.propTypes = {
    background: PropTypes.string,
    children: PropTypes.node,
    foreground: PropTypes.string
};

export default Home;
