import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HslSlider from '../hsl-slider';
import './colorInputs.scss';

class ColorInputs extends Component {

    constructor(props) {
        super(props);
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleTextColorChange = this.handleTextColorChange.bind(this);
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

    handleTextColorChange(e) {
        let newTextColorColor;
        if(!e.target) {
            newTextColorColor = e;
        } else {
            newTextColorColor = e.target.value;
        }
        this.props.setTextColorColor(newTextColorColor);
    }

    render() {
        const textColor = this.props.textColor;
        const background = this.props.background;
        const formTextColor = this.props.isLight ? '#222' : '#fff';

        const styles = {
            form: {
                color: formTextColor
            },
            input: {
                borderColor: formTextColor,
                color: 'inherit'
            }
        };

        return (
            <form className="form" style={styles.form}>
                <div className="form-control">
                    <label className="form-label" htmlFor="textColor">{'Text Color'}</label>
                    <input
                        className="form-input"
                        id="textColor"
                        type="text"
                        value={textColor}
                        onChange={this.handleTextColorChange}
                        style={styles.input}
                    />
                    <HslSlider
                        id="textColor-hsl"
                        value={textColor}
                        onChange={this.handleTextColorChange}
                    />
                </div>
                <div className="form-control">
                    <label className="form-label" htmlFor="background">{'Background'}</label>
                    <input
                        className="form-input"
                        id="background"
                        type="text"
                        value={background}
                        onChange={this.handleBackgroundChange}
                        style={styles.input}
                    />
                    <HslSlider
                        id="background-hsl"
                        value={background}
                        onChange={this.handleBackgroundChange}
                    />
                </div>
            </form>
        );
    }
}

ColorInputs.propTypes = {
    background: PropTypes.string.isRequired,
    children: PropTypes.node,
    isLight: PropTypes.bool.isRequired,
    setBackgroundColor: PropTypes.func,
    setTextColorColor: PropTypes.func,
    textColor: PropTypes.string.isRequired
};

export default ColorInputs;
