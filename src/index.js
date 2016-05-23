import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './components/home';
import About from './components/about';
import IndexLayout from './layout/index.js';

render((
    <Router history={browserHistory}>
        <Route path="/" component={IndexLayout}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
        </Route>
    </Router>
), document.getElementById('app'));
