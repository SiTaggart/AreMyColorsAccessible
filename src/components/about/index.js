import React, { Component, PropTypes } from 'react';

class About extends Component {
    render() {
        return (
            <main>
                <h1>{'About'}</h1>
                {this.props.children}
            </main>
        );
    }
}

About.propTypes = {
    children: PropTypes.node
};

export default About;