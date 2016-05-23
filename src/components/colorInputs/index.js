import React, { Component, PropTypes } from 'react';
import HslSliders from 'react-hsl-sliders';
import './colorInputs.scss';

class ColorInputs extends Component {

    constructor(props) {
        super(props);
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleForegroundChange = this.handleForegroundChange.bind(this);
    }

    handleBackgroundChange(e) {
        this.props.setBackgroundColor(e.target.value);
    }

    handleForegroundChange(e) {
        this.props.setForegroundColor(e.target.value);
    }

    render() {
        let foreground = this.props.foreground;
        let background = this.props.background;

        return (
            <form className="form">
                <fieldset>
                    <div className="form-control">
                        <label htmlFor="foreground">{'Foreground'}</label>
                        <input
                            id="foreground"
                            type="text"
                            defaultValue={foreground}
                            onChange={this.handleForegroundChange}
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
                            defaultValue={background}
                            onChange={this.handleBackgroundChanege}
                        />
                        <HslSliders
                            id="background-hsl"
                            value={background}
                            onChange={this.handleBackgroundChanege}
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

ColorInputs.DefaultProps = { foreground: '#fff' };

export default ColorInputs;