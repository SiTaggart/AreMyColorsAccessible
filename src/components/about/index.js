import React, { Component, PropTypes } from 'react';
import { Container, LayoutSmall } from '../layouts';
import './about.scss';

class About extends Component {
    render() {
        return (
            <Container className="about">
                <LayoutSmall>
                    <h1>{'About'}</h1>
                    <p>
                        {'something'}
                    </p>
                </LayoutSmall>
                {this.props.children}
            </Container>
        );
    }
}

About.propTypes = {
    children: PropTypes.node
};

export default About;