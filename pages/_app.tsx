import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Global } from '@emotion/react';
import { globalStyles } from '../styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        content="Make sure the colours you choose in your designs are accessible to people of all abilities, by choosing colour combinations that pass WCAG 2.0 recommendated colour contrast ratio guidelines."
        name="description"
      />
    </Head>
    <Script
      data-cf-beacon='{"token": "3f3dc45fbcb6445da40d94cfcd7fc1d0"}'
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
    />
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
);
// eslint-disable-next-line import/no-default-export
export default MyApp;
