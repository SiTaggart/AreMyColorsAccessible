import React from 'react';
import Home from '../components/home';
import LayoutShared from '../components/layouts/layout-shared';

const Index = () => <LayoutShared>{props => <Home {...props} />}</LayoutShared>;

export default Index;
