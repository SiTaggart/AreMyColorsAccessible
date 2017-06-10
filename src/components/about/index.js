import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, LayoutSmall } from '../layouts';
import './about.scss';

class About extends Component {
    render() {
        const textColor = this.props.siteData.isLight ? '#222' : '#fff';
        const styles = {
            textColor: {
                color: textColor
            }
        };
        return (
            <Container className="about" style={styles.textColor}>
                <LayoutSmall>
                    <h1 className="heading-1">{'Are my Colours Accessible?'}</h1>
                    <p>
                        {'Why? Well, apart from being an excuse to use a domain name, colour contrast and the use of colour is extremely important for certain groups of people with varying levels of visional impairment.'}
                    </p>
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
                            Make it easier for users to see and
                            hear content including separating foreground from
                            background.<br/>
                            <cite>
                                &ndash; <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast">Guideline 1.4 Distinguishable:</a>
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
                                &ndash; <a href="https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast">1.4.3 Contrast (Minimum):</a>
                                WCAG 2.0 Guidelines
                            </cite>
                        </p>
                    </blockquote>
                    <p>
                        {'For text-based information to be perceivable by users of all visual ability, and to safely meet WCAG 2.0, AA requirements, you should aim for a minimum contrast ratio of 4.5:1 for normal text 14pt and above, and 3.0:1 for large text 18pt and above or bold text, 14pt and above.'}
                    </p>
                    <p>
                        {'Building upon and heavily influenced by the excellent '}<a href="http://jxnblk.com/colorable/">Colorable</a>{', I wanted more context around the result. When you share the outcome with your colleagues, all the results, rules and what you\'re aiming for, is easily understandable for when you have those awkward conversations with designers and marketers.'}
                    </p>
                    <p>
                        {'Accessibility doesn\'t have to be ugly.'}
                    </p>
                </LayoutSmall>
                {this.props.children}
            </Container>
        );
    }
}

About.propTypes = {
    children: PropTypes.node,
    siteData: PropTypes.shape({
        isLight: PropTypes.bool
    })

};

export default About;
