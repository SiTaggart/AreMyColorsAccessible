import React from 'react';
import About from '../components/about';
import AppContainer from '../components/layouts/app-container';

const AboutPage = () => <AppContainer>{() => <About />}</AppContainer>;

export default AboutPage;
