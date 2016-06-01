import React, { Component, PropTypes } from 'react';
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
                foreground: '#FFFFFF',
                isLight: false
            }
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.setBackgroundColor = this.setBackgroundColor.bind(this);
        this.setForegroundColor = this.setForegroundColor.bind(this);
        this.updateHash = this.updateHash.bind(this);
    }

    componentDidMount() {
        let query = this.props.location.query;
        if(isEmpty(query)) return;
        query.isLight = (query.isLight == 'true');
        this.setState({siteData: query});
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

    setBackgroundColor(hex) {
        let siteData = this.state.siteData;
        siteData.background = hex;
        siteData.isLight = this.checkBackgroundLightness(hex);
        this.setState({siteData: siteData}, debounce(this.updateHash, 200));
    }

    setForegroundColor(hex) {
        let siteData = this.state.siteData;
        siteData.foreground = hex;
        this.setState({siteData: siteData}, debounce(this.updateHash, 200));
    }

    updateHash() {
        const query = '?' + qs.stringify(this.state.siteData);
        window.history.pushState(this.state, 'Are My Colors Accessible', query);
    }

    render() {
        let footerLinksColor = this.state.siteData.isLight ? '#222' : '#fff';
        let styles = {
            container: {
                background: this.state.siteData.background,
                color: this.state.siteData.foreground
            },
            footerLinks: {
                color: footerLinksColor
            }
        };

        return (
            <div className="appContainer" style={styles.container}>
                {React.cloneElement(this.props.children, {
                    siteData: this.state.siteData,
                    setBackgroundColor: this.setBackgroundColor,
                    setForegroundColor: this.setForegroundColor
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