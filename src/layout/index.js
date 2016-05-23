import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './styles.scss';

class IndexLayout extends Component {
    render() {
        return (
            <div className="appContainer">
                {this.props.children}
                <footer>
                    <nav role="navigation">
                        <ul>
                            <li><Link to="/">{'Home'}</Link></li>
                            <li><Link to="/about">{'About'}</Link></li>
                        </ul>
                    </nav>
                </footer>
            </div>
        );
    }
}

IndexLayout.propTypes = {
    children: PropTypes.node
};

export default IndexLayout;