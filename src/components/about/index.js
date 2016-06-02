import React, { Component, PropTypes } from 'react';
import { Container, LayoutSmall } from '../layouts';
import './about.scss';

class About extends Component {
    render() {
        return (
            <Container className="about">
                <LayoutSmall>
                    <h1 className="heading-1">{'Are my Colors Accessible?'}</h1>
                    <blockquote className="blockquote">
                        <p>
                            Information and user interface components must be
                            presentable to users in ways they can perceive. <br/>
                            <cite>
                                &ndash; <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#perceivable">Principle 1: Perceivable</a>,
                                WCAG 2.0 Guidelines
                            </cite>
                        </p>
                    </blockquote>
                    <blockquote className="blockquote">
                        <p>
                            Create content that can be
                            presented in different ways (for example simpler layout)
                            without losing information or structure.<br/>
                            <cite>
                                &ndash; <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#perceivable">Guideline 1.3 Adaptable:</a>,
                                WCAG 2.0 Guidelines
                            </cite>
                        </p>
                    </blockquote>
                    <blockquote className="blockquote">
                        <p>
                            The visual presentation of
                            text and images of text has a contrast ratio of at least
                            4.5:1, except for the following: (Level AA).<br/>
                            <cite>
                                &ndash; <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#perceivable">1.4.3 Contrast (Minimum):</a>,
                                WCAG 2.0 Guidelines
                            </cite>
                        </p>
                    </blockquote>
                    <blockquote className="blockquote">
                        <p>
                            Checkpoint 2.2 - Ensure that foreground and background
                            color combinations provide sufficient contrast when
                            viewed by someone having color deficits or when viewed
                            on a black and white screen.<br/>
                            <cite>
                                &ndash; <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#perceivable">Principle 1: Perceivable</a>,
                                WCAG 2.0 Guidelines
                            </cite>
                        </p>
                    </blockquote>
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