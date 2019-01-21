import React from 'react';
import Home from '../components/home';
import AppContaienr from '../components/layouts/app-container';

const Index = () => <AppContaienr>{props => <Home {...props} />}</AppContaienr>;

export default Index;
