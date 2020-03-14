import React from 'react';
import { AppProps } from 'next/app';
import { Global } from '@emotion/core';
import { globalStyles } from '../styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
);
// eslint-disable-next-line import/no-default-export
export default MyApp;
