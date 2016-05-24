import React, { Component, PropTypes } from 'react';
import Color from 'color';
import HslSliders from 'react-hsl-sliders';
import './colorInputs.scss';

class ColorInputs extends Component {

    constructor(props) {
        super(props);
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleForegroundChange = this.handleForegroundChange.bind(this);
    }

    handleBackgroundChange(e) {
        let newBackgroundColor;
        if(!e.target) {
            newBackgroundColor = e;
        } else {
            newBackgroundColor = e.target.value;
        }
        this.props.setBackgroundColor(newBackgroundColor);
    }

    handleForegroundChange(e) {
        let newForegroundColor;
        if(!e.target) {
            newForegroundColor = e;
        } else {
            newForegroundColor = e.target.value;
        }
        this.props.setForegroundColor(newForegroundColor);
    }

    render() {
        let foreground = this.props.foreground;
        let background = this.props.background;
        let light = Color(background).light();
        let textColor;

        textColor = light ? '#333' : '#fff';

        let styles = {
            form: {
                color: textColor
            },
            input: {
                borderColor: textColor,
                color: 'inherit'
            }
        };

        return (
            <form className="form" style={styles.form}>
                <fieldset>
                    <div className="form-control">
                        <label htmlFor="foreground">{'Foreground'}</label>
                        <input
                            id="foreground"
                            type="text"
                            value={foreground}
                            onChange={this.handleForegroundChange}
                            style={styles.input}
                        />
                        <HslSliders
                            id="foreground-hsl"
                            value={foreground}
                            onChange={this.handleForegroundChange}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="background">{'background'}</label>
                        <input
                            id="background"
                            type="text"
                            value={background}
                            onChange={this.handleBackgroundChange}
                            style={styles.input}
                        />
                        <HslSliders
                            id="background-hsl"
                            value={background}
                            onChange={this.handleBackgroundChange}
                        />
                    </div>
                </fieldset>
            </form>
        );
    }
}

ColorInputs.propTypes = {
    background: PropTypes.string.isRequired,
    children: PropTypes.node,
    foreground: PropTypes.string.isRequired,
    setBackgroundColor: PropTypes.func,
    setForegroundColor: PropTypes.func
};

export default ColorInputs;