import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';
import Color from 'color';
import './styles.scss';

class IndexLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            siteData: {
                background: '#1276CE',
                textColor: '#FFFFFF',
                isLight: false
            }
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
        this.setTextColorColor = this.setTextColorColor.bind(this);
        this.updateHash = this.updateHash.bind(this);
    }

    componentDidMount() {
        this.getQueryParams();
    }

    checkBackgroundLightness(hex) {
        let light;

        try {
            light = Color(hex).light();
        } catch(e) {
            light = true;
        }

        return light;
    }

    getQueryParams() {
        const query = this.props.location.query;
        if(isEmpty(query)) return;
        query.isLight = (query.isLight == 'true');
        this.setState({siteData: query});
    }

    setBackgroundColor(hex) {
        let siteData = this.state.siteData;
        siteData.background = hex;
        siteData.isLight = this.checkBackgroundLightness(hex);
        this.setState({siteData: siteData}, debounce(this.updateHash, 200));
    }

    setTextColorColor(hex) {
        let siteData = this.state.siteData;
        siteData.textColor = hex;
        this.setState({siteData: siteData}, debounce(this.updateHash, 200));
    }

    updateHash() {
        const query = '?' + qs.stringify(this.state.siteData);
        window.history.pushState(this.state, 'Are My Colors Accessible', query);
    }

    render() {
        const footerLinksColor = this.state.siteData.isLight ? '#222' : '#fff';
        const styles = {
            footerLinks: {
                color: footerLinksColor
            }
        };
        document.body.style.backgroundColor = this.state.siteData.background;
        document.body.style.color = this.state.siteData.textColor;

        return (
            <div className="appContainer">
                {React.cloneElement(this.props.children, {
                    siteData: this.state.siteData,
                    setBackgroundColor: this.setBackgroundColor,
                    setTextColorColor: this.setTextColorColor
                })}
                <footer className="footer">
                    <nav role="navigation">
                        <ul>
                            <li><Link style={styles.footerLinks} to="/">{'Home'}</Link></li>
                            <li><Link style={styles.footerLinks} to="/about">{'About'}</Link></li>
                        </ul>
                    </nav>
                </footer>
            </div>
        );
    }
}

IndexLayout.propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
        query: PropTypes.object
    })
};

export default IndexLayout;
