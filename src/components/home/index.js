import React, { Component, PropTypes } from 'react';
import './home-styles.scss';
import Results from '../results';
import ColorInputs from '../colorInputs';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            background: '#fff',
            foreground: '#333'
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
        return (
            <main className="home">
                <Results />
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
    children: PropTypes.node
};

export default Home;
